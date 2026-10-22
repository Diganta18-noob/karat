from pathlib import Path
import re,json
p=Path('ALL-QUESTIONS-ERRORS-AND-ANSWERS.md')
s=p.read_text(encoding='utf-8')
pattern=re.compile(r'(<details>\s*<summary>Original supplied code</summary>\s*```(\w*)\n)(.*?)(\n```\s*</details>)',re.S)
blocks=0; total=0; report=[]
def annotate(m):
 global blocks,total
 blocks+=1
 code=m.group(3); lines=code.split('\n'); notes=[]; out=[]
 partial=code.rstrip().endswith('se'); ctx='createContex' in code
 paging='displayList' in code; edit='const UserView' in code
 def mark(kind,msg,fix,jsx=False):
  global total
  ident=f'{kind} {len(notes)+1}'
  content=f'[{ident}] {msg} FIX: {fix}'
  out.append((' '*4+'{/* '+content+' */}') if jsx else '// '+content)
  notes.append((ident,msg,fix)); total+=1
 for i,line in enumerate(lines):
  t=line.strip(); jsx=t.startswith(('<','{data.products.map','{currentProducts.map','{beforeList.map','{afterList.map','{location.page','{ location.page'))
  if '""' in line and ('https://' in line or 'className=' in line or 'page:' in line or 'alert(' in line or 'location.page' in line):
   mark('COPY ARTIFACT','Doubled quotes are invalid here if they are literal source text.','Normalize copied quotes, e.g. "list" instead of ""list"".',jsx)
  if 'createContex' in line:
   mark('ERROR','createContex is misspelled; React exports createContext.','Use createContext; also import useContext for the consumers.')
  if '.provider' in line and t.startswith('<') and not t.startswith('</'):
   mark('ERROR','The context provider name and passed props are incorrect.','Use <HandlePageContext.Provider value={{ location, changeLocation }}>.',True)
  if 'useContext(handlePageContext)' in line:
   mark('ERROR','useContext is not imported, the context name has the wrong case, and changeLocation duplicates the prop binding.','Import useContext, use HandlePageContext, and remove changeLocation from component props.')
  if '<RouterComponent provider=' in line:
   mark('ERROR','handlePageContext is undefined and this custom prop does not consume context.','Render <RouterComponent> with a descendant that reads location and changeLocation via useContext.',True)
  if ctx and re.search(r'location\.page|changeLocation\(""list',line) and 'App' not in line and '<a ' in line or (ctx and 'location.page' in line):
   mark('ERROR','App reads location/changeLocation outside their RouterComponent scope.','Move this routing UI into a child of the provider and read the context there.',True)
  if '}+F9' in line or ')}+F9' in line:
   mark('COPY ARTIFACT','+F9 is stray pasted text, not navigation logic.','Remove the stray spreadsheet text.',True)
  if re.search(r'=\s*Fetch\(',line):
   mark('ERROR','Fetch is undefined, so rendering fails before the intended request.','Call the declared useFetch hook instead.')
  if 'const ViewProduct' in line and '= Fetch(' in code:
   mark('MISSING','This component has no loading/error/null guards.','Check loading, error, and data before reading product fields.')
  if '<div>View</div>' in line:
   mark('MISSING','Only a placeholder is rendered; none of the requested fields appear.','Render bold title, category, dollar price, description, and thumbnail after loading.',True)
  if 'await fetch(' in line and 'AbortController' not in code:
   mark('ROBUSTNESS','This request is not canceled/ignored after cleanup. Network failures also need handling unless a catch already exists.','Add effect cleanup with AbortController or an ignore flag; wrap the request in try/catch.')
  if '(async () =>' in line:
   mark('ROBUSTNESS','Loading and prior errors are not reset when URL/method changes.','Set loading=true and clear the prior error at the start of each request.')
  if re.search(r'if\s*\(!response\.ok\)',line):
   mark('ERROR','The failure branch falls through into JSON parsing and success updates.','Throw an error or return from the failure path; handle thrown errors in catch.')
  if 'if (hasError)' in line:
   mark('ERROR','hasError here is a captured state value, not a reliable status for this request.','Reset error at request start and update success/error explicitly.')
  if '<img ' in line and 'alt=' not in line:
   mark('ACCESSIBILITY','The image has no alternative text.','Add alt={data.title}.',True)
  if paging and 'data.products.map(' in line:
   mark('MISSING','All fetched products are rendered, so pagination is absent.','Map a ten-product slice or request a ten-product API page.',True)
  if re.fullmatch(r'<li>',t):
   mark('REACT WARNING','The outer element returned by map has no stable key.','Use <li key={product.id}>.',True)
  if '<div className="user-item">' in line or '<div className=""user-item"">' in line:
   mark('REACT WARNING','Each mapped user wrapper needs a key.','Add key={user.id} to this wrapper.',True)
  if '<a ' in line and 'href=' not in line:
   mark('ACCESSIBILITY','This action uses an anchor without href.','Use a button for the action, or a real link for URL navigation.',True)
  if 'const [pages,setPages]' in line:
   mark('MISSING' if paging else 'CLEANUP','This state holds 10 but does not track an active page; setPages is unused.','Use a separate pageSize constant and currentPage state; remove unused state.')
  if paging and 'alert(' in line:
   mark('MISSING','The supposed pagination handler only opens an alert.','Update the current page instead of alerting.')
  if paging and ('<button>Prev</button>' in line or '<button>Next</button>' in line):
   mark('MISSING','This pagination button has no navigation handler or boundary guard.','Add onClick to change the page and disabled at the first/last page.',True)
  if 'currentPage===totalPages' in line:
   mark('EDGE CASE','With no products totalPages is 0, so page 1 leaves Next enabled.','Render an empty state and disable Next using currentPage >= totalPages.',True)
  if edit and '<button className=' in line and '>Edit</button>' in line:
   mark('MISSING','Edit has no handler, input, Apply/Cancel logic, or active-editor state.','Track one editing user ID and draft birth date; implement Apply/Cancel and regroup users.',True)
  if 'internalUsers.sort(' in line:
   mark('ERROR','The comparator returns -1 even for equal dates.','Return the timestamp difference so equal dates produce 0.')
  if 'Born after 2000' in line and edit:
   mark('LABEL','The code uses >=2000, so this list also includes people born in 2000.','Label it "Born in or after 2000".',True)
  if re.match(r'console.log\(wrapLines\(words[1-6],',t) and 'const words1' not in code:
   mark('ERROR','This words variable is not defined in the supplied snippet.','Define the test input or invoke reflowAndJustify using lines/lines2.')
  if t=='let':
   mark('SYNTAX ERROR','This variable declaration is unfinished, so the whole snippet fails to parse.','Complete the function, including wrapping, justification, and a returned array.')
  if 'if(!wordCount === 0)' in line:
   mark('ERROR','!wordCount is a boolean, and strict comparison to numeric 0 is always false.','Use if (wordCount === 0) return 0.')
  if 'if(words.length === 0) words[0]' in line:
   mark('ERROR','The expression returns nothing and does not guard the one-word case.','For justification use if (words.length === 1) return words[0]; handle an empty list separately.')
  if "out += '_'.repeat(hyphen)" in line:
   mark('ERROR','The prompt requires one hyphen per word gap, but this adds distributed underscores.','For word-wrap use words.join("-"); do not pad or justify.')
  if 'result.push(jsutWrap(' in line:
   mark('WRONG TASK','This helper performs full justification, but this question requires plain word wrapping.','Push current.join("-") instead.')
  if 'partsWithRobots[robot]=[part]' in line:
   mark('ERROR','The first part is inserted here and pushed again on the next line.','Initialize an empty array before push, or preferably store parts in a Set.')
  if t=='partsWithRobots':
   mark('MISSING','This expression performs no required-part check. The function also never returns matching robots.','Check every required part for each robot, collect matching names, and return them.')
  if t=='se' and partial:
   mark('INCOMPLETE','The supplied snippet stops mid-statement and has unmatched blocks.','Obtain the full source; the intended implementation cannot be determined.')
  if 'const [debouncedQuery' in line:
   mark('MISSING','debouncedQuery is updated but never used by a filter or request.','Use this delayed value to drive the actual search.')
  if 'const filteredProducts = products.filter(' in line:
   mark('OPTIONAL','This valid filter runs on every keystroke; it is not debounced.','Only if debounce is required, filter using a delayed query and avoid repeated calculation.')
  out.append(line)
 if not notes:
  if 'lazy(' in code:
   msg='No demonstrated error: lazy/Suspense is valid if Dashboard exists and has the expected default export.'
  else:
   msg='No demonstrated implementation error: this block supplies data only. The requested solution function still needs to be written.'
  out.insert(0,'// [STATUS] '+msg)
  notes.append(('STATUS',msg,'See the implementation below.'))
 header=m.group(1).replace('<details>','<details open>').replace('Original supplied code','Original supplied code with error markers')
 guide='\n\n**What to tell the interviewer:**\n\n'+'\n'.join(f'- **{ident}:** {msg} {fix}' for ident,msg,fix in notes)+'\n'
 report.append({'block':blocks,'markers':len(notes)})
 return header+'\n'.join(out)+m.group(4)+guide
updated=pattern.sub(annotate,s)
legend='''## How to read the inline markers

The original snippets below are expanded and annotated directly above the relevant lines. The original code lines are retained, including copied mistakes. Annotated originals are study examples, not runnable corrected apps. Use the corrected answer below each snippet to run the solution.

- **ERROR / SYNTAX ERROR:** A concrete defect in the supplied code.
- **MISSING / WRONG TASK:** A requested behavior is absent or a different algorithm was implemented.
- **ROBUSTNESS / EDGE CASE:** Failure handling, cleanup, or boundary behavior needs attention.
- **REACT WARNING / ACCESSIBILITY / LABEL:** Explain these separately from crashes.
- **COPY ARTIFACT:** A problem only if the pasted characters appear literally in the editor.
- **OPTIONAL / CLEANUP / STATUS:** An improvement or a valid/missing-source example, not a demonstrated runtime error.

Each marker includes the cause and a short FIX. The list immediately after each original snippet gives wording you can say in the interview. Corrected answers remain unchanged. An omitted fetch method is valid: GET is the default.

'''
updated=updated.replace('## Shared corrected fetch Hook: useFetch.js',legend+'## Shared corrected fetch Hook: useFetch.js',1)
updated=updated.replace('The original source code remains unmodified.','Original code lines are preserved; inline study comments and interview explanations have been added.')
# Verify every non-original fenced block is preserved, and original lines are preserved after stripping inserted markers.
origblocks=list(pattern.finditer(s))
newpattern=re.compile(r'<details open>\s*<summary>Original supplied code with error markers</summary>\s*```\w*\n(.*?)\n```\s*</details>',re.S)
newblocks=list(newpattern.finditer(updated))
assert len(origblocks)==len(newblocks)==35
for a,b in zip(origblocks,newblocks):
 cleaned='\n'.join(l for l in b.group(1).split('\n') if not (l.startswith('// [') or l.startswith('    {/* [')))
 assert cleaned==a.group(3),'Original source changed'
# All source headings and questions remain.
assert re.findall(r'^## React JS!F\d+',s,re.M)==re.findall(r'^## React JS!F\d+',updated,re.M)
original_corrected=re.findall(r'```\w*\n(.*?)\n```',pattern.sub('',s),re.S)
updated_corrected=re.findall(r'```\w*\n(.*?)\n```',newpattern.sub('',updated),re.S)
assert original_corrected==updated_corrected,'Corrected examples changed'
p.write_text(updated,encoding='utf-8',newline='\n')
print(json.dumps({'annotated_original_snippets':blocks,'issue_markers':total,'all_original_lines_preserved':True,'corrected_examples_preserved':True}))
