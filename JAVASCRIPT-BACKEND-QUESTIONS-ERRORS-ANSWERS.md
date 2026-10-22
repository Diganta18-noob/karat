# JavaScript backend: original questions, marked errors and corrected answers

[Start with the simple commented answers and run commands](BEGINNER-BACKEND-ANSWERS.md).

This guide follows the frontend answer format. Each entry contains its question, the original source with short review comments, the problems, and full corrected code with an explanation immediately below. Repeated reports retain their own entries. Review comments are annotations, not source content. Missing implementations are not invented as original code.

## Contents

- [Javascript - BE!F2](#javascript---bef2)
- [Javascript - BE!F3](#javascript---bef3)
- [Javascript - BE!F4](#javascript---bef4)
- [Javascript - BE!F5](#javascript---bef5)
- [Javascript - BE!F6](#javascript---bef6)
- [Javascript - BE!F7](#javascript---bef7)
- [Javascript - BE!F8](#javascript---bef8)
- [Javascript - BE!F9](#javascript---bef9)
- [Javascript - BE!F10](#javascript---bef10)
- [Javascript - BE!F11](#javascript---bef11)
- [Javascript - BE!F12](#javascript---bef12)
- [Javascript - BE!F13](#javascript---bef13)
- [Javascript - BE!F14](#javascript---bef14)
- [Javascript - BE!F15](#javascript---bef15)
- [Javascript - BE!F16](#javascript---bef16)
- [Javascript - BE!F17](#javascript---bef17)
- [Javascript - BE!F18](#javascript---bef18)
- [Javascript - BE!F19](#javascript---bef19)
- [Javascript - BE!F20](#javascript---bef20)
- [Javascript - BE!F21](#javascript---bef21)
- [Javascript - BE!F22](#javascript---bef22)
- [Javascript - BE!F23](#javascript---bef23)
- [Javascript - BE!F24](#javascript---bef24)
- [Javascript - BE!F25](#javascript---bef25)
- [Javascript - BE!F26](#javascript---bef26)
- [Javascript - BE!F27](#javascript---bef27)
- [Javascript - BE!F28](#javascript---bef28)

## Error comments

`// REVIEW ERROR:` marks a demonstrated defect. `MISSING` identifies required functionality. `CHECK` and `IMPROVEMENT` identify conditional or robustness changes. `CORRECT` highlights a fix already present in that particular copy. Original report prose/comment artifacts are preserved; use the corrected code when running the answer.

## Javascript - BE!F2

### Question 1 in this cell

This cell contains a reference, interview account, or missing/corrupted question rather than a complete supplied code snippet.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Same Questions as the below one.F2+F2
```

</details>

#### Problems in this snippet

- The cell is a self-referential/copying note, not a code snippet. Its exact intended source cannot be identified.

#### Corrected answer and explanation

##### L. Missing questions, broken references and copying errors

- **F2:** “Same Questions as the below one.F2+F2” is a broken/self-referential note, not a code snippet. The following row's questions are covered, but the exact intended reference cannot be established.
- **F6:** “Retrieving data. Wait a few seconds...” is a spreadsheet copying error, not a question or JavaScript exception.
- **F18:** Refers to the stock task and describes the interview process; it supplies no new code.
- **F20:** “Combination of row 2 and 10” does not reliably identify which numbering convention was used. It adds no implementation; see the linked admin/stock answers without treating the reference as proof of exact source.
- **F21:** Refers to the MySQL/string task and gym task; see H and I.
- **F24:** Mentions Node streaming/database discussion and a corporate-security coding puzzle but omits the snippets and actual puzzle requirements. A complete exact solution cannot be produced from that description. General review areas include backpressure, avoiding unnecessary buffering, error propagation, releasing resources, parameterized database access and trusted authorization. These are investigation points, not demonstrated defects in unseen code. Node's HTTP request/response model is documented in the [official API reference](https://nodejs.org/api/http.html).
- **F25/F28 database-string review:** The database query itself is not included. Evaluate repeated reads, pooling, selecting only required columns, input validation and parameter binding once the actual query is available; do not claim proven injection or hardcoded credentials without evidence.

##### Verification

The corrected stock classes passed the original tests extracted from F10, F13, F14 and F19. The corrected gym classes passed the original tests from F16, F17 and F28, including their different average durations. All corrected JavaScript implementation blocks were parsed. Additional checks passed for whitespace/numeric log parsing, completed journeys, one-ticket-per-journey speeding, repeated speeding journeys, all seven original teleporter cases, string reversal, duplicate IDs, empty/negative transaction maxima, grouped todos, profile validation, final connection counts, and mocked handler authorization/method/input handling.

The DOM applications, live HTTP endpoints, and real MySQL connections were not integration-tested. Workbook tollbooth fixture files under /content/test are absent; their expected totals were not rerun. Examples marked as reconstructions depend on the documented assumptions and injected services. The workbook itself was not edited.

## Javascript - BE!F3

### Question 1 in this cell

Explain and improve the admin-only highest-transaction endpoint. Fix duplicate user-ID handling and describe appropriate tests.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Code snippet shown() where get, get2, httpsServerHandler function were written, question were asked to explain to code in detail. what could be improved in the code and what are the problem and the their solutions basically the code was related to removing duplicate user IDs, fetches each user's transactions, finds the highest transaction amount for each, and returns this data via an HTTP endpoint (for admins only)
request: {
  body: {
    userIds: [], // Array of duplicates user ids
    role: "ADMIN"
  }
}
Response will be there only if role is ADMIN.

Questions on snippet:
Explain the code and what exactly it will return.
Improve readability and maintanability
Unit tests for shown snippet
Given ['a','b','a','b','c'] and asked why the code is not returning correct output
```

</details>

#### Problems in this snippet

- The admin-handler implementation is described but not copied, so exact get/get2 lines cannot be inspected.
- F8/F9 identify the related final-element loop bug; use a Set or a loop that includes the final element.
- Do not authorize using a client-supplied role. The corrected handler below is a labeled reference implementation.

#### Corrected answer and explanation

##### A. Unique user IDs and highest transactions for an admin

**Sources:** F3, F8, F9, F26, F27; related references in F20.

**Question:** Explain an HTTP endpoint that deduplicates user IDs, reads transactions, returns the maximum amount for each user, and permits only admins. Improve readability, find the duplicate-ID bug, and propose tests.

###### What is actually wrong?

The implementation of `get`, `get2`, and `httpsServerHandler` is **not copied into the workbook**. F8/F9 report the concrete bug: the loop uses `i < a.length - 1`, so the final input is never examined. With `['a','b','a','b','c']`, the unique `c` is lost.

```js
// Wrong bound reported in the interview:
for (let i = 0; i < userIds.length - 1; i++) { /* ... */ }

// Correct bound:
for (let i = 0; i < userIds.length; i++) { /* ... */ }

// Simpler deduplication:
const uniqueUserIds = [...new Set(userIds)];
```

**Other issues to investigate, not invent:** The reports put `role` in `req.body`. A client-supplied role cannot establish authorization. Use identity/roles established by trusted authentication middleware. Raw Node HTTP requests do not automatically have a parsed `req.body`; an Express-style example must explicitly assume JSON middleware. Check input validation, error propagation, repeated database queries and response completion.

Initializing a maximum at `-1` is valid only under an explicitly nonnegative-amount/sentinel contract. This answer uses `null` for no transactions and also supports negative values. Never use `Math.max(...[])` without an empty case.

###### Corrected reference implementation

This is an **Express-style handler factory**. It assumes a trusted authentication middleware has set `req.user` and JSON middleware has parsed `req.body`. `getMaxByUserIds` is an injected repository method returning `{userId, maxAmount}` rows; the original schema and framework are not supplied.

```js
function uniqueIds(userIds) {
  if (!Array.isArray(userIds) || userIds.length > 1000) {
    throw new TypeError("userIds must be an array of at most 1000 IDs");
  }
  if (userIds.some((id) => typeof id !== "string" || !id.trim())) {
    throw new TypeError("Every user ID must be a nonempty string");
  }
  return [...new Set(userIds)];
}

function highestAmount(transactions) {
  if (transactions.length === 0) return null;
  let maximum = -Infinity;
  for (const transaction of transactions) {
    if (!Number.isFinite(transaction.amount)) {
      throw new TypeError("Transaction amounts must be finite numbers");
    }
    maximum = Math.max(maximum, transaction.amount);
  }
  return maximum;
}

function makeHighestTransactionsHandler(getMaxByUserIds) {
  return async function highestTransactionsHandler(req, res) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }
    if (!req.user) return res.status(401).json({ error: "Authentication required" });
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    let ids;
    try {
      ids = uniqueIds(req.body?.userIds);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    if (ids.length === 0) return res.status(200).json([]);

    try {
      const rows = await getMaxByUserIds(ids);
      const amounts = new Map(rows.map((row) => [row.userId, row.maxAmount]));
      return res.status(200).json(ids.map((userId) => ({
        userId,
        highestTransaction: amounts.get(userId) ?? null,
      })));
    } catch {
      return res.status(500).json({ error: "Unable to read transactions" });
    }
  };
}
```

**Database improvement:** If the schema supports it, use one parameterized aggregate query rather than reading every transaction per user. Example schema only:

```sql
SELECT user_id AS userId, MAX(amount) AS maxAmount
FROM transactions
WHERE user_id IN (?, ?, ?)
GROUP BY user_id;
```

Generate the placeholder count from the validated ID count and bind the ID values; do not concatenate input values into SQL. The schema, tenant constraints and driver decimal representation must match the real application. Do not assume database DECIMAL values are always JavaScript numbers. Prepared placeholders and promise-based access are documented by [MySQL2](https://sidorares.github.io/node-mysql2/docs).

**Tests:** empty IDs, all duplicates, unique final ID, one ID, invalid IDs, non-admin, unauthenticated, incorrect method, database failure, no transactions, zero amount and negative amounts if allowed. Verify `role: "ADMIN"` in the body cannot override a non-admin authenticated user.

**Explanation:** Deduplicate before database access. Separate validation, authorization, querying and response formatting. Database aggregation reduces transferred data and can avoid N+1 queries. `405` is the usual response for a recognized route with the wrong method; the reported original uses `404`, which should be checked against its intended contract rather than treated as a syntax error.

### Question 2 in this cell

Initially show 20 todos, display the number loaded, append 20 more on Load More, and hide the button after 100 are loaded.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```js
/*
Given an API returning a list of todos, we want to display the list in a performant way.

Here are the functional requirements:
- Initially, display the first 20 todos. 
- On the top of the page, display the total number of loaded todos.
- Display a "Load More" button, and every time the user clicks on it, fetch and display 20 more todos.
- When the total number of loaded todos reaches 100, the "Load More" button should be hidden.

Use this endpoint URL to get the todos: https://dummyjson.com/todos?limit=20&skip=0.

You may change the skip and limit query params to load new todos. The endpoint will return the following structure with a total of 20 todos:
{
  "todos": [
    {
      "id": 1,       "todo": "Do something nice for someone I care about",
      "completed": true,
      "userId": 26
    },
  ],
}
*/

Solution: 
let loadedRes = 0;
const root = document.getElementById('root');
const getData = async(skip = 0) => {
  const url = `https://dummyjson.com/todos?limit=20&skip=${skip}`;
  // REVIEW MISSING: Check HTTP status, catch failures, and prevent overlapping Load More requests.
  const result = await fetch(url);
  const data = await result.json();
  console.log(data)
  load(data);
}

const load = (result) => {
  // REVIEW ERROR: This removes previously loaded todos; append the next batch instead.
  root.innerHTML = '';
  // REVIEW ERROR: Count actual returned todos, not an assumed batch size.
  loadedRes = loadedRes + 20;
  const h1 = document.createElement('h1');
  h1.textContent = `Total loaded = ${loadedRes}`;
  
  const list = document.createElement('ul');
  result.todos.map((item) => {
    const li = document.createElement('li');
    li.textContent = item.todo;
    list.appendChild(li);
  });
  
  const button = document.createElement('button');
  button.textContent = "Load more";
  button.addEventListener('click', () => { getData(loadedRes) })
  
  if(loadedRes >= 100) {
    button.style.display = 'none'
  }
  
  root.appendChild(h1);
  root.appendChild(list);
  root.appendChild(button);
}
// REVIEW ERROR: The trailing a is an unrelated identifier and can throw ReferenceError.
getData();a
```

</details>

#### Problems in this snippet

- The UI clears previously loaded records instead of appending.
- The loaded count assumes a batch always contains 20 items rather than counting actual records.
- Request failures and overlapping clicks are not handled.
- The trailing a after getData() can throw ReferenceError.

#### Corrected answer and explanation

##### B. Fetch 20 todos at a time, retain them and stop at 100

**Source:** F3, second task.

**Question:** Initially show 20 todos, display the loaded count, append 20 more per click, and hide Load More at 100.

###### Errors in the supplied solution

- `root.innerHTML = ''` removes the previous list, so the UI replaces rather than accumulates todos.
- `loadedRes += 20` assumes every response contains exactly 20 records; it is not the actual loaded count.
- The next offset relies on that assumed count.
- There is no response.ok check, request error UI, or in-flight guard against repeated clicks.
- `getData();a` has a stray `a`, causing a ReferenceError if no such variable exists.
- `map` is used only for side effects; a loop/forEach is clearer.

###### Corrected browser code

Requires `<div id="root"></div>` and a script loaded after that element. The endpoint returns JSON shaped like the supplied prompt. Its `total` value, if present, also limits loading.

```js
function createTodoLoader(root, fetchImpl = fetch) {
  const count = document.createElement("h2");
  const list = document.createElement("ul");
  const error = document.createElement("p");
  error.setAttribute("role", "alert");
  const button = document.createElement("button");
  button.textContent = "Load More";
  root.replaceChildren(count, list, error, button);

  let loaded = 0;
  let loading = false;
  let exhausted = false;

  function updateControls() {
    count.textContent = `Total loaded = ${loaded}`;
    button.disabled = loading;
    button.hidden = exhausted || loaded >= 100;
  }

  async function loadMore() {
    if (loading || exhausted || loaded >= 100) return;
    loading = true;
    error.textContent = "";
    updateControls();

    try {
      const limit = Math.min(20, 100 - loaded);
      const response = await fetchImpl(
        `https://dummyjson.com/todos?limit=${limit}&skip=${loaded}`
      );
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data.todos)) throw new Error("Invalid todos response");

      const batch = data.todos.slice(0, limit);
      const fragment = document.createDocumentFragment();
      for (const todo of batch) {
        const item = document.createElement("li");
        item.textContent = todo.todo;
        fragment.appendChild(item);
      }
      list.appendChild(fragment);
      loaded += batch.length;
      exhausted = batch.length < limit ||
        (Number.isFinite(data.total) && loaded >= data.total);
    } catch (failure) {
      error.textContent = failure.message;
    } finally {
      loading = false;
      updateControls();
    }
  }

  button.addEventListener("click", loadMore);
  updateControls();
  return { loadMore };
}

// const loader = createTodoLoader(document.getElementById("root"));
// loader.loadMore();
```

**Explanation:** Create the list once, append safe text nodes, advance the offset only after success, count actual records, disable during requests, and allow retry after a failure. This follows offset pagination's assumption of a stable ordered API list.

## Javascript - BE!F4

### Question 1 in this cell

Search phones and mobile accessories by text, filter by either category or both, display title/price/category, and handle no matches.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
A large e-commerce site is looking to expand into mobile phone sales. They want to add the ability to search for both phones and accessories using product search and filter features.
 
The requirements for this feature are:
- Implement a search bar where users can enter a query to search for products.
- Display the search results in a list, showing the product title, price, and category.
- The results must be limited to only those from the phones and mobile accessories categories.
- Implement a filter to further limit the products only from one of the two specific categories (smartphones, mobile-accessories).
- Allow users to search products in both categories (without no filter selected) or with the search and filter queries (e.g., search for "iPhone" within the "smartphones" category).
- Show a message if no products match the search and filter criteria.
 
This endpoint can be used to fetch a list of products: https://dummyjson.com/products/search?q={query}. Each product has the foll…
{
  "products": [
    {
      "id": 1,
      "title": "iPhone X",
      "price": 19.99,
      "category": "smartphone"
    }
  ]
}
```

</details>

#### Problems in this snippet

- Only requirements and sample data are present; no implementation is supplied.
- The sample category smartphone conflicts with the requirement smartphones; use/confirm canonical category names.

#### Corrected answer and explanation

##### C. Search phones and mobile accessories

**Source:** F4.

**Question:** Search products by text, restrict all results to smartphones/mobile-accessories, optionally filter to either category, and show an empty state.

**Source status:** No implementation is supplied. The sample object says `smartphone` singular while requirements specify `smartphones`. Use the actual API's canonical values; this answer uses the requirement's values.

###### Corrected reference browser code

Requires `<div id="root"></div>`.

```js
function createProductSearch(root, fetchImpl = fetch) {
  const input = document.createElement("input");
  input.setAttribute("aria-label", "Search products");
  input.placeholder = "Search phones or accessories";
  const category = document.createElement("select");
  category.setAttribute("aria-label", "Category");
  for (const [value, label] of [
    ["", "Both categories"],
    ["smartphones", "Smartphones"],
    ["mobile-accessories", "Mobile accessories"],
  ]) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    category.appendChild(option);
  }
  const message = document.createElement("p");
  const list = document.createElement("ul");
  root.replaceChildren(input, category, message, list);
  const allowed = new Set(["smartphones", "mobile-accessories"]);
  let controller;
  let timer;

  async function search() {
    controller?.abort();
    const request = new AbortController();
    controller = request;
    message.textContent = "Loading...";
    list.replaceChildren();
    const url = new URL("https://dummyjson.com/products/search");
    url.searchParams.set("q", input.value.trim());
    const selectedCategory = category.value;

    try {
      const response = await fetchImpl(url, { signal: request.signal });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data.products)) throw new Error("Invalid products response");
      if (request.signal.aborted) return;
      const products = data.products.filter((product) =>
        allowed.has(product.category) &&
        (!selectedCategory || product.category === selectedCategory)
      );
      for (const product of products) {
        const item = document.createElement("li");
        item.textContent = `${product.title} — $${Number(product.price).toFixed(2)} — ${product.category}`;
        list.appendChild(item);
      }
      message.textContent = products.length ? "" : "No matching products.";
    } catch (failure) {
      if (!request.signal.aborted) message.textContent = failure.message;
    }
  }

  input.addEventListener("input", () => {
    clearTimeout(timer);
    controller?.abort();
    timer = setTimeout(search, 300);
  });
  category.addEventListener("change", () => {
    clearTimeout(timer);
    search();
  });
  return { search };
}

// const search = createProductSearch(document.getElementById("root"));
// search.search();
```

**Explanation:** Always enforce the two-category restriction, even when the dropdown is empty. Apply the optional filter in addition to the search. Abort stale requests. This searches/filters the returned API batch; if every matching record is required, load all result pages rather than assuming one response is the full catalog. The original prompt does not include a complete pagination contract.

## Javascript - BE!F5

### Question 1 in this cell

Fetch the supplied todos and create one block per userId containing that user’s todos.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
/*
Given an API returning a list of todos, we want to fetch the list, create a separate block for each user, and display their todos in the appropriate block.
 
Use this endpoint URL to get the todos: https://dummyjson.com/todos?limit=10&skip=80. It will return the following structure with total…
{
  "todos": [
    {
      "id": 1,
      "todo": "Do something nice for someone I care about",
      "completed": true,
      "userId": 26
    },
  ],
}
 
Each block should contain the userId as the title of the block and the list of todos.
*/
```

</details>

#### Problems in this snippet

- Only the task and response shape are supplied. Group the fetched todos by userId and safely render one section per group.

#### Corrected answer and explanation

##### D. Group todos into a separate block for each user

**Source:** F5.

**Question:** Fetch the specified todos and display each user's todos under that user's ID.

**Source status:** Only the task and response shape are supplied; there is no implementation bug to identify.

```js
function groupTodos(todos) {
  const groups = new Map();
  for (const todo of todos) {
    if (!groups.has(todo.userId)) groups.set(todo.userId, []);
    groups.get(todo.userId).push(todo);
  }
  return groups;
}

async function renderGroupedTodos(root, fetchImpl = fetch) {
  root.textContent = "Loading todos...";
  try {
    const response = await fetchImpl("https://dummyjson.com/todos?limit=10&skip=80");
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const data = await response.json();
    const groups = groupTodos(data.todos);
    const fragment = document.createDocumentFragment();
    for (const [userId, todos] of groups) {
      const section = document.createElement("section");
      const heading = document.createElement("h2");
      heading.textContent = `User ${userId}`;
      section.appendChild(heading);
      const list = document.createElement("ul");
      for (const todo of todos) {
        const item = document.createElement("li");
        item.textContent = todo.todo;
        list.appendChild(item);
      }
      section.appendChild(list);
      fragment.appendChild(section);
    }
    root.replaceChildren(fragment);
    if (!groups.size) root.textContent = "No todos found.";
  } catch (failure) {
    root.textContent = failure.message;
  }
}
```

**Explanation:** A Map makes one group per user even when entries are interleaved. Grouping takes O(T) time and space for T todos. `textContent` displays supplied data as text rather than interpreting HTML; see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent).

## Javascript - BE!F6

### Question 1 in this cell

This cell contains a reference, interview account, or missing/corrupted question rather than a complete supplied code snippet.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Retrieving data. Wait a few seconds and try to cut or copy again.
```

</details>

#### Problems in this snippet

- Retrieving data... is a copying failure, not a question or a code error. No missing code can be recovered from this cell.

#### Corrected answer and explanation

##### L. Missing questions, broken references and copying errors

- **F2:** “Same Questions as the below one.F2+F2” is a broken/self-referential note, not a code snippet. The following row's questions are covered, but the exact intended reference cannot be established.
- **F6:** “Retrieving data. Wait a few seconds...” is a spreadsheet copying error, not a question or JavaScript exception.
- **F18:** Refers to the stock task and describes the interview process; it supplies no new code.
- **F20:** “Combination of row 2 and 10” does not reliably identify which numbering convention was used. It adds no implementation; see the linked admin/stock answers without treating the reference as proof of exact source.
- **F21:** Refers to the MySQL/string task and gym task; see H and I.
- **F24:** Mentions Node streaming/database discussion and a corporate-security coding puzzle but omits the snippets and actual puzzle requirements. A complete exact solution cannot be produced from that description. General review areas include backpressure, avoiding unnecessary buffering, error propagation, releasing resources, parameterized database access and trusted authorization. These are investigation points, not demonstrated defects in unseen code. Node's HTTP request/response model is documented in the [official API reference](https://nodejs.org/api/http.html).
- **F25/F28 database-string review:** The database query itself is not included. Evaluate repeated reads, pooling, selecting only required columns, input validation and parameter binding once the actual query is available; do not claim proven injection or hardcoded credentials without evidence.

##### Verification

The corrected stock classes passed the original tests extracted from F10, F13, F14 and F19. The corrected gym classes passed the original tests from F16, F17 and F28, including their different average durations. All corrected JavaScript implementation blocks were parsed. Additional checks passed for whitespace/numeric log parsing, completed journeys, one-ticket-per-journey speeding, repeated speeding journeys, all seven original teleporter cases, string reversal, duplicate IDs, empty/negative transaction maxima, grouped todos, profile validation, final connection counts, and mocked handler authorization/method/input handling.

The DOM applications, live HTTP endpoints, and real MySQL connections were not integration-tested. Workbook tollbooth fixture files under /content/test are absent; their expected totals were not rerun. Examples marked as reconstructions depend on the documented assumptions and injected services. The workbook itself was not edited.

## Javascript - BE!F7

### Question 1 in this cell

Parse tollbooth entries correctly and count completed journeys. In the longer versions, identify speeding journeys. The shortened report instead asks for unique cars with both event types.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Problem Description: Car Journey Log Analysis
You are given a set of log entries that record cars passing through a tollbooth system. Each log entry contains the following information:

License Plate – a unique identifier for each car
Timestamp – the time at which the log was recorded
Log Type – one of the following:

"entry" – when a car enters the toll road
"exit" – when a car exits the toll road
"main road" – when a car passes through the tollbooth without entering or exiting


Direction of Travel – such as "east", "west", "north", or "south"
Additional Metadata – such as vehicle type, toll amount, or other relevant details

Task 1: Fix Assertion Error
There is an assertion error in the existing code that prevents the log entries from being printed correctly.
Issue: The error occurs because a log entry value (e.g., 234234.17) was being compared or asserted as a number, but it was treated as a string or something else.
Answer: The fix was to typecast the value to Number before performing the assertion or before printing it, which resolved the issue and allowed the logs to print correctly.
Task 2: Count Completed Journeys
Write a function that returns the number of cars that have completed a journey.
A journey is considered complete if a car has:

At least one "entry" log
At least one "exit" log

Cars that only have one of these logs or only "main road" logs should not be counted as having completed a journey.
```

</details>

#### Problems in this snippet

- Only the reported bug is supplied, not its exact implementation. The report says a numeric timestamp was stored as text.
- This shortened task counts unique cars with entry/exit events; the longer tollbooth tasks count completed journeys, which is a different quantity.

#### Corrected answer and explanation

##### F. Tollbooth parsing, completed journeys and speeding

**Sources:** F7, F12, F22, F26, F27.

###### Errors and differences between rows

- F7/F26 describe a string-versus-number timestamp bug. Convert with `Number`, not parseInt, because timestamps include fractions.
- F12/F22/F27 **already use `Number(tokens[0])`**. Do not add a nonexistent conversion fix to those copies.
- `split(' ')` is fragile with repeated whitespace; use trim/split(/\s+/).
- F12 leaves a standalone empty `countJourneys(logs)` function, while tests call `logFile.countJourneys()`. Implement the method on LogFile.
- F22/F27 already count EXIT events correctly under the explicit complete-log assumption. Their missing task is catchSpeeders.
- F12 contains copied unmatched/nested comment delimiters. Clean the wrapper before running it.
- Test log files under `/content/test/...` are not included in the workbook; the original file-based totals cannot be independently rerun without those fixtures.

###### Corrected classes

```js
class LogEntry {
  constructor(logLine) {
    const tokens = logLine.trim().split(/\s+/);
    if (tokens.length !== 4) throw new Error("Expected four log fields");
    const [timestamp, plate, locationDirection, type] = tokens;
    const match = /^(\d+)([EW])$/.exec(locationDirection);
    if (!match) throw new Error("Invalid location/direction");
    if (!["ENTRY", "EXIT", "MAINROAD"].includes(type)) throw new Error("Invalid booth type");
    this.timestamp = Number(timestamp);
    if (!Number.isFinite(this.timestamp)) throw new Error("Invalid timestamp");
    this.license_plate = plate;
    this.location = Number(match[1]);
    this.direction = match[2] === "E" ? "EAST" : "WEST";
    this.booth_type = type;
  }
  toString() {
    return `<LogEntry timestamp: ${this.timestamp} license: ${this.license_plate} location: ${this.location} direction: ${this.direction} booth type: ${this.booth_type}>`;
  }
}

class LogFile {
  constructor(contents) {
    this.logEntries = contents.split(/\r?\n/).filter((line) => line.trim())
      .map((line) => new LogEntry(line));
  }
  get length() { return this.logEntries.length; }
  item(index) { return this.logEntries[index]; }

  countJourneys() {
    // The question guarantees complete journeys and no missing entries.
    return this.logEntries.reduce((count, entry) =>
      count + (entry.booth_type === "EXIT" ? 1 : 0), 0);
  }

  catchSpeeders() {
    const byPlate = new Map();
    for (const entry of this.logEntries) {
      if (!byPlate.has(entry.license_plate)) byPlate.set(entry.license_plate, []);
      byPlate.get(entry.license_plate).push(entry);
    }
    const tickets = [];
    for (const [plate, entries] of byPlate) {
      entries.sort((a, b) => a.timestamp - b.timestamp);
      let journey = null;
      for (const entry of entries) {
        if (entry.booth_type === "ENTRY") {
          journey = { previous: entry, segments120: 0, unsafe: false };
          continue;
        }
        if (!journey) continue; // Ignore driving outside the highway.
        const previous = journey.previous;
        const seconds = entry.timestamp - previous.timestamp;
        const distance = Math.abs(entry.location - previous.location);
        if (seconds <= 0 || entry.direction !== previous.direction) {
          throw new Error("Invalid journey sequence");
        }
        // Individual 10km speed cannot be inferred from a gap of multiple booths.
        if (distance !== 10) throw new Error("Expected consecutive 10km booth records");
        const speed = distance * 3600 / seconds;
        if (speed >= 130) journey.unsafe = true;
        if (speed >= 120) journey.segments120++;
        if (journey.segments120 >= 2) journey.unsafe = true;
        journey.previous = entry;

        if (entry.booth_type === "EXIT") {
          if (journey.unsafe) tickets.push(plate);
          journey = null;
        }
      }
    }
    return tickets;
  }
}
```

**Explanation:** A journey is ENTRY through EXIT; MAINROAD events do not start or end it. Calculate km/h as distance * 3600 / elapsed seconds. Use absolute distance for westbound journeys. Flag either one segment >=130 or any two segments >=120 (not necessarily adjacent). Append at most one ticket per journey, but allow the same plate again for a different journey. Sorting per vehicle supports interleaved logs; it is O(L log L) overall, or O(L) processing if per-vehicle chronological order is already guaranteed. Complete 10km sensor records are assumed; gaps do not prove individual-segment speeds.

###### Different task in F7/F26: count cars, not journeys

Those shortened reports ask for cars with at least one entry and exit. That counts a car once, even if it made two trips. Do not confuse it with F12/F22/F27, which explicitly count trips.

```js
function countCarsWithEntryAndExit(entries) {
  const flags = new Map();
  for (const entry of entries) {
    const plate = entry.license_plate;
    if (!flags.has(plate)) flags.set(plate, { entry: false, exit: false });
    const state = flags.get(plate);
    const type = entry.booth_type.toUpperCase();
    if (type === "ENTRY") state.entry = true;
    if (type === "EXIT") state.exit = true;
  }
  return [...flags.values()].filter((value) => value.entry && value.exit).length;
}
```

This matches the simplified “has both event types” statement; for actually paired valid trips use an ENTRY/EXIT state machine. Clarify which result is required.

## Javascript - BE!F8

### Question 1 in this cell

Explain and improve the admin-only highest-transaction endpoint. Fix duplicate user-ID handling and describe appropriate tests.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Code Snippet: 

Http create server question for finding highest transaction of users.
Input: UserIds, role (req.body)
Function 1: to find unique userIds using forEach loop and returns array of unique users.
Function 2: to find highest transaction, starting from max = -1 (non-negative numbers), using loop.

The highest transaction for each user given in the request body by user with role ADMIN and req.method === POST is taken. If user has role apart from ADMIN, his request is denied using status code 403, otherwise status 404 is shown.

Questions on this were:
1. What does the code do?
2. How to improve the code readability and maintainability? (For example, Can use 'set' to find unique userIds instead of a lengthier process)
3. There is a bug in the code, how to fix it? (Ans: in function 1, we find unique users using for i = 0, i < a.length -1. Here the -1 excludes the last array input element causing an issue. Removing that fixes the bug)
4. If we were to write test cases on this, what test cases can we write?

--------------
```

</details>

#### Problems in this snippet

- The reported ID loop excludes the last input element. Use i < userIds.length or a Set.
- No full handler code is provided in this cell; the answer below is a reference implementation.

#### Corrected answer and explanation

##### A. Unique user IDs and highest transactions for an admin

**Sources:** F3, F8, F9, F26, F27; related references in F20.

**Question:** Explain an HTTP endpoint that deduplicates user IDs, reads transactions, returns the maximum amount for each user, and permits only admins. Improve readability, find the duplicate-ID bug, and propose tests.

###### What is actually wrong?

The implementation of `get`, `get2`, and `httpsServerHandler` is **not copied into the workbook**. F8/F9 report the concrete bug: the loop uses `i < a.length - 1`, so the final input is never examined. With `['a','b','a','b','c']`, the unique `c` is lost.

```js
// Wrong bound reported in the interview:
for (let i = 0; i < userIds.length - 1; i++) { /* ... */ }

// Correct bound:
for (let i = 0; i < userIds.length; i++) { /* ... */ }

// Simpler deduplication:
const uniqueUserIds = [...new Set(userIds)];
```

**Other issues to investigate, not invent:** The reports put `role` in `req.body`. A client-supplied role cannot establish authorization. Use identity/roles established by trusted authentication middleware. Raw Node HTTP requests do not automatically have a parsed `req.body`; an Express-style example must explicitly assume JSON middleware. Check input validation, error propagation, repeated database queries and response completion.

Initializing a maximum at `-1` is valid only under an explicitly nonnegative-amount/sentinel contract. This answer uses `null` for no transactions and also supports negative values. Never use `Math.max(...[])` without an empty case.

###### Corrected reference implementation

This is an **Express-style handler factory**. It assumes a trusted authentication middleware has set `req.user` and JSON middleware has parsed `req.body`. `getMaxByUserIds` is an injected repository method returning `{userId, maxAmount}` rows; the original schema and framework are not supplied.

```js
function uniqueIds(userIds) {
  if (!Array.isArray(userIds) || userIds.length > 1000) {
    throw new TypeError("userIds must be an array of at most 1000 IDs");
  }
  if (userIds.some((id) => typeof id !== "string" || !id.trim())) {
    throw new TypeError("Every user ID must be a nonempty string");
  }
  return [...new Set(userIds)];
}

function highestAmount(transactions) {
  if (transactions.length === 0) return null;
  let maximum = -Infinity;
  for (const transaction of transactions) {
    if (!Number.isFinite(transaction.amount)) {
      throw new TypeError("Transaction amounts must be finite numbers");
    }
    maximum = Math.max(maximum, transaction.amount);
  }
  return maximum;
}

function makeHighestTransactionsHandler(getMaxByUserIds) {
  return async function highestTransactionsHandler(req, res) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }
    if (!req.user) return res.status(401).json({ error: "Authentication required" });
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    let ids;
    try {
      ids = uniqueIds(req.body?.userIds);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    if (ids.length === 0) return res.status(200).json([]);

    try {
      const rows = await getMaxByUserIds(ids);
      const amounts = new Map(rows.map((row) => [row.userId, row.maxAmount]));
      return res.status(200).json(ids.map((userId) => ({
        userId,
        highestTransaction: amounts.get(userId) ?? null,
      })));
    } catch {
      return res.status(500).json({ error: "Unable to read transactions" });
    }
  };
}
```

**Database improvement:** If the schema supports it, use one parameterized aggregate query rather than reading every transaction per user. Example schema only:

```sql
SELECT user_id AS userId, MAX(amount) AS maxAmount
FROM transactions
WHERE user_id IN (?, ?, ?)
GROUP BY user_id;
```

Generate the placeholder count from the validated ID count and bind the ID values; do not concatenate input values into SQL. The schema, tenant constraints and driver decimal representation must match the real application. Do not assume database DECIMAL values are always JavaScript numbers. Prepared placeholders and promise-based access are documented by [MySQL2](https://sidorares.github.io/node-mysql2/docs).

**Tests:** empty IDs, all duplicates, unique final ID, one ID, invalid IDs, non-admin, unauthenticated, incorrect method, database failure, no transactions, zero amount and negative amounts if allowed. Verify `role: "ADMIN"` in the body cannot override a non-admin authenticated user.

**Explanation:** Deduplicate before database access. Separate validation, authorization, querying and response formatting. Database aggregation reduces transferred data and can avoid N+1 queries. `405` is the usual response for a recognized route with the wrong method; the reported original uses `404`, which should be checked against its intended contract rather than treated as a syntax error.

### Question 2 in this cell

Fix paid gym membership counts and implement addWorkout and getAverageWorkoutDurations.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Gym Membership, Members and Status:
Gym Membership Status:
BRONZE (default)
SILVER (paid)
GOLD (paid)

Classes for Membership, Members and the Membership Status are made.
The section of code which is wrong will be highlighted by the invigilator. 
In this instance the issue was with the total count of paid members which was being calculated using '.length'.

this.membershipStatus === membershipStatus.SILVER;

Here, they are only checking if status is Silver, we need to find members with Gold status as well. So adding 'membershipStatus.GOLD' to the code accordingly will fix the issue. It can also be fixed by using a negated equal sign, i.e., this.membershipStatus !== membershipStatus.BRONZE; this will also give the same result.

Test case:
They are using assert with strictEqual to check if the number of members (both paid and unpaid status) are being filtered correctly from the code to match the number of paid members.
```

</details>

#### Problems in this snippet

- The report says paid-member filtering counts SILVER but omits GOLD.
- The complete class is not copied in this row; the corrected implementation below also supports the workbook’s workout extension.

#### Corrected answer and explanation

##### I. Gym membership statistics and average workout durations

**Sources:** F8/F9 describe the issue; F16/F17 contain one version; F28 contains another version; F21 references the gym task.

###### Errors and differences

- F16/F17 only count SILVER as paid; GOLD must count too.
- F28 **already checks SILVER or GOLD**, so that fix is not missing there.
- Dividing by zero for an empty gym produces NaN; choose a documented empty conversion rate. This answer uses 0%.
- F16/F17 omit addWorkout/getAverageWorkoutDurations. F28 includes empty placeholders and has no workouts storage.
- A standalone `Coding Question 2:` line outside a comment is invalid source if copied literally.
- Do not use `status !== BRONZE` as the only paid check unless the status domain is validated; unknown values would accidentally count as paid.

###### Corrected complete classes

```js
class MembershipStatus {
  static BRONZE = 1;
  static SILVER = 2;
  static GOLD = 3;
}

class Member {
  constructor(memberId, name, membershipStatus = MembershipStatus.BRONZE) {
    this.memberId = memberId;
    this.name = name;
    this.membershipStatus = membershipStatus;
  }
  isEqual(other) {
    return other instanceof Member && this.memberId === other.memberId &&
      this.name === other.name && this.membershipStatus === other.membershipStatus;
  }
  toString() {
    return `Member ID: ${this.memberId}, Name: ${this.name}, Membership Status: ${this.membershipStatus}`;
  }
}

class Workout {
  constructor(id, startTime, endTime) {
    if (!Number.isFinite(startTime) || !Number.isFinite(endTime) ||
        startTime < 0 || endTime > 1440 || endTime < startTime) {
      throw new RangeError("Invalid same-day workout times");
    }
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }
  getDuration() { return this.endTime - this.startTime; }
}

class Membership {
  constructor(members = []) {
    this.members = [];
    this.memberById = new Map();
    this.workouts = new Map();
    for (const member of members) this.addMember(member);
  }
  addMember(member) {
    if (this.memberById.has(member.memberId)) throw new Error("Duplicate member ID");
    this.members.push(member);
    this.memberById.set(member.memberId, member);
  }
  updateMembership(memberId, status) {
    if (![MembershipStatus.BRONZE, MembershipStatus.SILVER, MembershipStatus.GOLD].includes(status)) {
      throw new Error("Invalid membership status");
    }
    const member = this.memberById.get(memberId);
    if (member) member.membershipStatus = status;
  }
  getMembershipStatistics() {
    const totalMembers = this.members.length;
    const totalPaidMembers = this.members.filter((member) =>
      member.membershipStatus === MembershipStatus.SILVER ||
      member.membershipStatus === MembershipStatus.GOLD
    ).length;
    const conversionRate = totalMembers ? totalPaidMembers / totalMembers * 100 : 0;
    return { totalMembers, totalPaidMembers, conversionRate };
  }
  addWorkout(memberId, workout) {
    if (!this.memberById.has(memberId)) return;
    if (!this.workouts.has(memberId)) this.workouts.set(memberId, []);
    this.workouts.get(memberId).push(workout);
  }
  getAverageWorkoutDurations() {
    const averages = new Map();
    for (const [memberId, workouts] of this.workouts) {
      const total = workouts.reduce((sum, workout) => sum + workout.getDuration(), 0);
      averages.set(memberId, total / workouts.length);
    }
    return averages;
  }
}
```

**Explanation:** Store workouts by member ID. Ignore unknown members as requested. Average each member's own sessions; do not divide by total members. Members without sessions are omitted from the returned Map, a policy consistent with the supplied checks. Input workout IDs are assumed unique as stated; repeated-submission policy is unspecified.

F16/F17 expected averages: ID12=25, ID22=50, ID31=70. F28 changes one session from 40 to 45 minutes, so ID31 is **72.5**, not 70. Unknown member ID4 must be absent. The fifth/sixth member variations change paid conversion from 60% to about 66.67%; do not hardcode either answer. Statistics O(M), workout insertion average O(1), averages O(W), storage O(M+W).

## Javascript - BE!F9

### Question 1 in this cell

Explain and improve the admin-only highest-transaction endpoint. Fix duplicate user-ID handling and describe appropriate tests.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Code Snippet: 

Http create server question for finding highest transaction of users.
Input: UserIds, role (req.body)
Function 1: to find unique userIds using forEach loop and returns array of unique users.
Function 2: to find highest transaction, starting from max = -1 (non-negative numbers), using loop.

The highest transaction for each user given in the request body by user with role ADMIN and req.method === POST is taken. If user has role apart from ADMIN, his request is denied using status code 403, otherwise status 404 is shown.

Questions on this were:
1. What does the code do?
2. How to improve the code readability and maintainability? (For example, Can use 'set' to find unique userIds instead of a lengthier process)
3. There is a bug in the code, how to fix it? (Ans: in function 1, we find unique users using for i = 0, i < a.length -1. Here the -1 excludes the last array input element causing an issue. Removing that fixes the bug)
4. If we were to write test cases on this, what test cases can we write?

--------------
```

</details>

#### Problems in this snippet

- The reported deduplication loop skips the final element.
- The request-body role cannot establish a trusted admin identity. The full handler is not copied.

#### Corrected answer and explanation

##### A. Unique user IDs and highest transactions for an admin

**Sources:** F3, F8, F9, F26, F27; related references in F20.

**Question:** Explain an HTTP endpoint that deduplicates user IDs, reads transactions, returns the maximum amount for each user, and permits only admins. Improve readability, find the duplicate-ID bug, and propose tests.

###### What is actually wrong?

The implementation of `get`, `get2`, and `httpsServerHandler` is **not copied into the workbook**. F8/F9 report the concrete bug: the loop uses `i < a.length - 1`, so the final input is never examined. With `['a','b','a','b','c']`, the unique `c` is lost.

```js
// Wrong bound reported in the interview:
for (let i = 0; i < userIds.length - 1; i++) { /* ... */ }

// Correct bound:
for (let i = 0; i < userIds.length; i++) { /* ... */ }

// Simpler deduplication:
const uniqueUserIds = [...new Set(userIds)];
```

**Other issues to investigate, not invent:** The reports put `role` in `req.body`. A client-supplied role cannot establish authorization. Use identity/roles established by trusted authentication middleware. Raw Node HTTP requests do not automatically have a parsed `req.body`; an Express-style example must explicitly assume JSON middleware. Check input validation, error propagation, repeated database queries and response completion.

Initializing a maximum at `-1` is valid only under an explicitly nonnegative-amount/sentinel contract. This answer uses `null` for no transactions and also supports negative values. Never use `Math.max(...[])` without an empty case.

###### Corrected reference implementation

This is an **Express-style handler factory**. It assumes a trusted authentication middleware has set `req.user` and JSON middleware has parsed `req.body`. `getMaxByUserIds` is an injected repository method returning `{userId, maxAmount}` rows; the original schema and framework are not supplied.

```js
function uniqueIds(userIds) {
  if (!Array.isArray(userIds) || userIds.length > 1000) {
    throw new TypeError("userIds must be an array of at most 1000 IDs");
  }
  if (userIds.some((id) => typeof id !== "string" || !id.trim())) {
    throw new TypeError("Every user ID must be a nonempty string");
  }
  return [...new Set(userIds)];
}

function highestAmount(transactions) {
  if (transactions.length === 0) return null;
  let maximum = -Infinity;
  for (const transaction of transactions) {
    if (!Number.isFinite(transaction.amount)) {
      throw new TypeError("Transaction amounts must be finite numbers");
    }
    maximum = Math.max(maximum, transaction.amount);
  }
  return maximum;
}

function makeHighestTransactionsHandler(getMaxByUserIds) {
  return async function highestTransactionsHandler(req, res) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }
    if (!req.user) return res.status(401).json({ error: "Authentication required" });
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    let ids;
    try {
      ids = uniqueIds(req.body?.userIds);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    if (ids.length === 0) return res.status(200).json([]);

    try {
      const rows = await getMaxByUserIds(ids);
      const amounts = new Map(rows.map((row) => [row.userId, row.maxAmount]));
      return res.status(200).json(ids.map((userId) => ({
        userId,
        highestTransaction: amounts.get(userId) ?? null,
      })));
    } catch {
      return res.status(500).json({ error: "Unable to read transactions" });
    }
  };
}
```

**Database improvement:** If the schema supports it, use one parameterized aggregate query rather than reading every transaction per user. Example schema only:

```sql
SELECT user_id AS userId, MAX(amount) AS maxAmount
FROM transactions
WHERE user_id IN (?, ?, ?)
GROUP BY user_id;
```

Generate the placeholder count from the validated ID count and bind the ID values; do not concatenate input values into SQL. The schema, tenant constraints and driver decimal representation must match the real application. Do not assume database DECIMAL values are always JavaScript numbers. Prepared placeholders and promise-based access are documented by [MySQL2](https://sidorares.github.io/node-mysql2/docs).

**Tests:** empty IDs, all duplicates, unique final ID, one ID, invalid IDs, non-admin, unauthenticated, incorrect method, database failure, no transactions, zero amount and negative amounts if allowed. Verify `role: "ADMIN"` in the body cannot override a non-admin authenticated user.

**Explanation:** Deduplicate before database access. Separate validation, authorization, querying and response formatting. Database aggregation reduces transferred data and can avoid N+1 queries. `405` is the usual response for a recognized route with the wrong method; the reported original uses `404`, which should be checked against its intended contract rather than treated as a syntax error.

### Question 2 in this cell

Fix paid gym membership counts and implement addWorkout and getAverageWorkoutDurations.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Gym Membership, Members and Status:
Gym Membership Status:
BRONZE (default)
SILVER (paid)
GOLD (paid)

Classes for Membership, Members and the Membership Status are made.
The section of code which is wrong will be highlighted by the invigilator. 
In this instance the issue was with the total count of paid members which was being calculated using '.length'.

this.membershipStatus === membershipStatus.SILVER;

Here, they are only checking if status is Silver, we need to find members with Gold status as well. So adding 'membershipStatus.GOLD' to the code accordingly will fix the issue. It can also be fixed by using a negated equal sign, i.e., this.membershipStatus !== membershipStatus.BRONZE; this will also give the same result.

Test case:
They are using assert with strictEqual to check if the number of members (both paid and unpaid status) are being filtered correctly from the code to match the number of paid members.
```

</details>

#### Problems in this snippet

- The reported paid-member check omits GOLD.
- No full class is copied in this row; use the complete implementation below.

#### Corrected answer and explanation

##### I. Gym membership statistics and average workout durations

**Sources:** F8/F9 describe the issue; F16/F17 contain one version; F28 contains another version; F21 references the gym task.

###### Errors and differences

- F16/F17 only count SILVER as paid; GOLD must count too.
- F28 **already checks SILVER or GOLD**, so that fix is not missing there.
- Dividing by zero for an empty gym produces NaN; choose a documented empty conversion rate. This answer uses 0%.
- F16/F17 omit addWorkout/getAverageWorkoutDurations. F28 includes empty placeholders and has no workouts storage.
- A standalone `Coding Question 2:` line outside a comment is invalid source if copied literally.
- Do not use `status !== BRONZE` as the only paid check unless the status domain is validated; unknown values would accidentally count as paid.

###### Corrected complete classes

```js
class MembershipStatus {
  static BRONZE = 1;
  static SILVER = 2;
  static GOLD = 3;
}

class Member {
  constructor(memberId, name, membershipStatus = MembershipStatus.BRONZE) {
    this.memberId = memberId;
    this.name = name;
    this.membershipStatus = membershipStatus;
  }
  isEqual(other) {
    return other instanceof Member && this.memberId === other.memberId &&
      this.name === other.name && this.membershipStatus === other.membershipStatus;
  }
  toString() {
    return `Member ID: ${this.memberId}, Name: ${this.name}, Membership Status: ${this.membershipStatus}`;
  }
}

class Workout {
  constructor(id, startTime, endTime) {
    if (!Number.isFinite(startTime) || !Number.isFinite(endTime) ||
        startTime < 0 || endTime > 1440 || endTime < startTime) {
      throw new RangeError("Invalid same-day workout times");
    }
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }
  getDuration() { return this.endTime - this.startTime; }
}

class Membership {
  constructor(members = []) {
    this.members = [];
    this.memberById = new Map();
    this.workouts = new Map();
    for (const member of members) this.addMember(member);
  }
  addMember(member) {
    if (this.memberById.has(member.memberId)) throw new Error("Duplicate member ID");
    this.members.push(member);
    this.memberById.set(member.memberId, member);
  }
  updateMembership(memberId, status) {
    if (![MembershipStatus.BRONZE, MembershipStatus.SILVER, MembershipStatus.GOLD].includes(status)) {
      throw new Error("Invalid membership status");
    }
    const member = this.memberById.get(memberId);
    if (member) member.membershipStatus = status;
  }
  getMembershipStatistics() {
    const totalMembers = this.members.length;
    const totalPaidMembers = this.members.filter((member) =>
      member.membershipStatus === MembershipStatus.SILVER ||
      member.membershipStatus === MembershipStatus.GOLD
    ).length;
    const conversionRate = totalMembers ? totalPaidMembers / totalMembers * 100 : 0;
    return { totalMembers, totalPaidMembers, conversionRate };
  }
  addWorkout(memberId, workout) {
    if (!this.memberById.has(memberId)) return;
    if (!this.workouts.has(memberId)) this.workouts.set(memberId, []);
    this.workouts.get(memberId).push(workout);
  }
  getAverageWorkoutDurations() {
    const averages = new Map();
    for (const [memberId, workouts] of this.workouts) {
      const total = workouts.reduce((sum, workout) => sum + workout.getDuration(), 0);
      averages.set(memberId, total / workouts.length);
    }
    return averages;
  }
}
```

**Explanation:** Store workouts by member ID. Ignore unknown members as requested. Average each member's own sessions; do not divide by total members. Members without sessions are omitted from the returned Map, a policy consistent with the supplied checks. Input workout IDs are assumed unique as stated; repeated-submission policy is unspecified.

F16/F17 expected averages: ID12=25, ID22=50, ID31=70. F28 changes one session from 40 to 45 minutes, so ID31 is **72.5**, not 70. Unknown member ID4 must be absent. The fifth/sixth member variations change paid conversion from 60% to about 66.67%; do not hardcode either answer. Statistics O(M), workout insertion average O(1), averages O(W), storage O(M+W).

## Javascript - BE!F10

### Question 1 in this cell

Fix failing StockCollection statistics tests and, where requested, implement getBiggestChange with the associated dates.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```js
"use strict";
/*
We are developing a stock trading data management software that tracks the prices of different stocks over time and provides useful statistics.

The program includes three classes: `Stock`, `PriceRecord`, and `StockCollection`.

Classes:
* The `Stock` class represents data about a specific stock.
* The `PriceRecord` class holds information about a single price record for a stock.
* The `StockCollection` class manages a collection of price records for a particular stock and provides methods to retrieve useful statistics about the stock's prices.

To begin with, we present you with two tasks:
1-1) Read through and understand the code below. Please take as much time as necessary, and feel free to run the code.
1-2) The test for StockCollection is not passing due to a bug in the code. Make the necessary changes to StockCollection to fix the bug.
*/
const assert = require("assert");

class Stock {
  /* Data about a particular stock. */
  constructor(symbol, name) {
    this.symbol = symbol; // String, the symbol of the stock
    this.name = name; // String, the name of the stock
  }

  isEqual(other) {
    if (!(other instanceof this.constructor)) return false;
    return this.symbol === other.symbol && this.name === other.name;
  }
}

class PriceRecord {
  /* Data and methods about a single price record of a stock. */
  constructor(stock, price, date) {
    this.stock = stock; // a Stock object representing the stock
    this.price = price; // int, the price of the stock
    this.date = date; // str, the date of the price record is of the format "YYYY-MM-DD"
  }

  isEqual(other) {
    console.log(`Getting inside equal check ${other}`)
    if (!(other instanceof this.constructor)) return false;
    return this.stock.isEqual(other.stock) && this.price === other.price && this.date === other.date;
  }
}

class StockCollection {
  /*
   * Data for a collection of price records for a particular stock, and methods for getting
   * useful statistics about the stock's prices.
   */
  constructor(stock) {
    console.log("Entering the class");
    this.priceRecords = []; // list of PriceRecord objects, the price records for this particular stock
    this.stock = stock; // stock, the Stock this StockCollection is for
  }

  getNumPriceRecords() {
    /* Returns the number of PriceRecords in this StockCollection */
    return this.priceRecords.length;
  }

  addPriceRecord(priceRecord) {
    /* Adds a PriceRecord to this StockCollection. */
    if (!priceRecord.stock.isEqual(this.stock)) {
      throw new Error("PriceRecord's Stock is not the same as the StockCollection's");
    }
    this.priceRecords.push(priceRecord);
  }

  getMaxPrice() {
    /* Return the maximum price recorded in this StockCollection. */
    // REVIEW ERROR: An empty collection returns -Infinity; tests require null.
    return Math.max(...this.priceRecords.map((priceRecord) => priceRecord.price));
  }

  getMinPrice() {
    /* Return the minimum price recorded in this StockCollection. */
    // REVIEW ERROR: An empty collection returns Infinity; tests require null.
    return Math.min(...this.priceRecords.map((priceRecord) => priceRecord.price));
  }

  getAvgPrice() {
    /* Return the average price recorded in this StockCollection. */
    const total = this.priceRecords.reduce((acc, priceRecord) => acc + priceRecord.price, 0);
    // REVIEW ERROR: Empty length causes 0/0 (NaN); tests require null.
    return total / this.priceRecords.length;
  }
}

const makeStockCollection = function (stock, priceData) {
  // Create a new StockCollection for test purposes.
  const stockCollection = new StockCollection(stock);
  
  for (const [price, date] of priceData) {
    const priceRecord = new PriceRecord(stock, price, date);
    stockCollection.addPriceRecord(priceRecord);
  }
  return stockCollection;
};

const testMethods = {
  testPriceRecord: () => {
    /* Test basic PriceRecord functionality */
    const testStock = new Stock("AAPL", "Apple Inc.");
    const testPriceRecord = new PriceRecord(testStock, 100, "2023-07-01");
    assert.strictEqual(testPriceRecord.stock, testStock);
    assert.strictEqual(testPriceRecord.price, 100);
    assert.strictEqual(testPriceRecord.date, "2023-07-01");
  },
  testStockCollection: () => {
    /* Test basic StockCollection functionality */
    const testStock = new Stock("AAPL", "Apple Inc.");
    const stockCollection = new StockCollection(testStock);
    assert.strictEqual(stockCollection.getNumPriceRecords(), 0);
    assert.strictEqual(stockCollection.getMaxPrice(), null);
    assert.strictEqual(stockCollection.getMinPrice(), null);
    assert.strictEqual(stockCollection.getAvgPrice(), null);

    /* Price Records:
     * Price:  110         112         90          105
     * Date:   2023-06-29  2023-07-01  2023-06-28  2023-07-06
     */
    const priceData = [
      [110, "2023-06-29"],
      [112, "2023-07-01"],
      [90, "2023-06-28"],
      [105, "2023-07-06"],
    ];
    const testStock2 = new Stock("AAPL", "Apple Inc.");
    const stockCollection2 = makeStockCollection(testStock2, priceData);
    assert.strictEqual(stockCollection2.getNumPriceRecords(), priceData.length);
    assert.strictEqual(stockCollection2.getMaxPrice(), 112);
    assert.strictEqual(stockCollection2.getMinPrice(), 90);
    assert.ok(Math.abs(stockCollection2.getAvgPrice() - 104.25) < 0.1);
  },
}

// run all tests
Object.getOwnPropertyNames(testMethods).forEach((func) => {
  try {
    console.log(`Running ${func}`);
    testMethods[func]();
    console.log('OK');
  } catch (e) {
    console.log('FAIL');
    console.log(e);
  }
  console.log('');
});
```

</details>

#### Problems in this snippet

- Empty Math.max is -Infinity; empty Math.min is Infinity; empty average is NaN. The tests require null for each.
- Nonempty statistics are otherwise consistent with the supplied test data.

#### Corrected answer and explanation

##### E. StockCollection: empty statistics and biggest change

**Sources:** F10, F13, F14, F18, F19; referenced in F20.

###### What fails?

In F10/F13/F19:

```js
Math.max(...[]) // -Infinity, but tests expect null
Math.min(...[]) // Infinity, but tests expect null
0 / 0          // NaN, but tests expect null
```

Add empty-array guards. F14 **already has these guards**; do not claim they are still missing there. Its line `const getBiggestChange = function()` is syntactically incomplete and is outside the class. The test calls an instance method, so implement it inside StockCollection and remove that dangling declaration.

The biggest change is the largest **absolute magnitude**, but the returned value retains its sign. Otherwise the provided `-30` test would fail. Consecutive means consecutive available records in date order, not necessarily adjacent calendar days.

###### Corrected complete classes

```js
class Stock {
  constructor(symbol, name) {
    this.symbol = symbol;
    this.name = name;
  }
  isEqual(other) {
    return other instanceof Stock &&
      this.symbol === other.symbol && this.name === other.name;
  }
}

class PriceRecord {
  constructor(stock, price, date) {
    this.stock = stock;
    this.price = price;
    this.date = date;
  }
  isEqual(other) {
    return other instanceof PriceRecord && this.stock.isEqual(other.stock) &&
      this.price === other.price && this.date === other.date;
  }
}

class StockCollection {
  constructor(stock) {
    this.stock = stock;
    this.priceRecords = [];
  }
  getNumPriceRecords() {
    return this.priceRecords.length;
  }
  addPriceRecord(record) {
    if (!record.stock.isEqual(this.stock)) throw new Error("Stock mismatch");
    if (!Number.isFinite(record.price)) throw new TypeError("Invalid price");
    this.priceRecords.push(record);
  }
  getMaxPrice() {
    if (!this.priceRecords.length) return null;
    return this.priceRecords.reduce((maximum, record) =>
      Math.max(maximum, record.price), -Infinity);
  }
  getMinPrice() {
    if (!this.priceRecords.length) return null;
    return this.priceRecords.reduce((minimum, record) =>
      Math.min(minimum, record.price), Infinity);
  }
  getAvgPrice() {
    if (!this.priceRecords.length) return null;
    const total = this.priceRecords.reduce((sum, record) => sum + record.price, 0);
    return total / this.priceRecords.length;
  }
  getBiggestChange() {
    if (this.priceRecords.length < 2) return null;
    // Assumes valid ISO dates and one record per date, as in the test data.
    const sorted = [...this.priceRecords].sort((a, b) => a.date.localeCompare(b.date));
    let result = null;
    for (let i = 1; i < sorted.length; i++) {
      const previous = sorted[i - 1];
      const current = sorted[i];
      const change = current.price - previous.price;
      if (result === null || Math.abs(change) > Math.abs(result[0])) {
        result = [change, previous.date, current.date];
      }
    }
    return result;
  }
}
```

**Explanation:** Empty statistics return the exact contract's null. Copy before sorting to preserve insertion order. Compare absolute changes, return the signed difference and both dates. For ties, this code keeps the earliest pair in chronological order; clarify that policy and duplicate-date behavior if needed. Statistics are O(R), biggest change O(R log R), with O(R) sorting space.

**Expected answers:** `[110,112,90,105]` gives max 112, min 90, average 104.25. Sorted dates in the first change test give `[20,"2023-06-25","2023-06-29"]`. The second test gives `[-30,"1999-12-30","2000-01-01"]`.

## Javascript - BE!F11

### Question 1 in this cell

Debug the profile dashboard, explain its flow, improve state/request handling and security, and propose better validation and async tests.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```js
// Debugging Question
var userProfile = null;
var userPosts = [];
var currentView = 'profile';

function logMessage(type, message) {
    if (type === 'error') {
        console.error('[ERROR]', message);
    } else {
        console.log('[INFO]', message);
    }
}

function initDashboard() {
    window.addEventListener('hashchange', function() {
        var hash = window.location.hash.substring(1);
        if (hash === 'profile' || hash === 'posts') {
            currentView = hash;
            renderView();
        } else {
            currentView = 'profile';
            window.location.hash = 'profile';
        }
    });

    if (!window.location.hash) {
        window.location.hash = 'profile';
    } else {
        currentView = window.location.hash.substring(1);
    }
    renderView();
}

function fetchUserProfile() {
    fetch('https://api.example.com/user/profile')
        .then(function(response) {
            // REVIEW MISSING: Check response.ok before treating this response as success.
            return response.json();
        })
        .then(function(data) {
            userProfile = data;
            // REVIEW CHECK: A request callback must not render this view after navigation has changed.
            renderProfile();
        })
        .catch(function(err) {
            logMessage('error', 'Failed to fetch user profile: ' + err);
        });
}

function fetchUserPosts() {
    fetch('https://api.example.com/user/posts')
        .then(function(response) {
            // REVIEW MISSING: Check response.ok before treating this response as success.
            return response.json();
        })
        .then(function(data) {
            userPosts = data;
            // REVIEW CHECK: A request callback must not render this view after navigation has changed.
            renderPosts();
        })
        .catch(function(err) {
            logMessage('error', 'Failed to fetch user posts: ' + err);
        });
}

function renderView() {
    if (currentView === 'profile') {
        if (!userProfile) {
            fetchUserProfile();
        } else {
            // REVIEW CHECK: A request callback must not render this view after navigation has changed.
            renderProfile();
        }
    } else if (currentView === 'posts') {
        // REVIEW ERROR: An empty successful result is confused with data that has not been loaded.
        if (userPosts.length === 0) {
            fetchUserPosts();
        } else {
            // REVIEW CHECK: A request callback must not render this view after navigation has changed.
            renderPosts();
        }
    }
}

function renderProfile() {
    var container = document.getElementById('dashboardContainer');
    if (!container) {
        logMessage('error', 'Dashboard container not found');
        return;
    }

    // REVIEW ERROR: Untrusted profile data is interpolated into HTML and input attributes; use DOM textContent/input.value.
    var html = "<h2>User Profile</h2>" +
        "<p>Name: " + userProfile.name + "</p>" +
        "<p>Email: " + userProfile.email + "</p>" +
        "<div id='editProfileBtn'><button>Edit Profile</button></div>" +
        "<div id='editProfileForm' style='display:none;'>" +
        "<input type='text' id='nameInput' value='" + userProfile.name + "' />" +
        "<input type='text' id='emailInput' value='" + userProfile.email + "' />" +
        "<button id='saveProfileBtn'>Save</button>" +
        "</div>";

    container.innerHTML = html;

    document.getElementById('editProfileBtn').addEventListener('click', function() {
        document.getElementById('editProfileForm').style.display = 'block';
    });

        // REVIEW ERROR: This should be inside the missing Save-button click listener; the following }); is unmatched.
        updateProfile();
    });
}

function renderPosts() {
    var container = document.getElementById('dashboardContainer');
    if (!container) {
        logMessage('error', 'Dashboard container not found');
        return;
    }

    container.innerHTML = "<h2>User Posts</h2>";
    userPosts.forEach(function(post) {
        // REVIEW ERROR: This reparses existing HTML and interpolates untrusted post content.
        container.innerHTML += "<div class='post-item'>" +
            "<h3>" + post.title + "</h3>" +
            "<p>" + post.content + "</p>" +
            "</div>";
    });
}

function validateProfileInput(name, email) {
    var errors = [];
    if (!name || name.trim() === "") {
        errors.push('Name is required.');
    }
    if (!email || !email.includes('@')) {
        errors.push('Valid email is required.');
    }
    return errors;
}

function updateProfile() {
    var name = document.getElementById('nameInput').value;
    var email = document.getElementById('emailInput').value;

    var validationErrors = validateProfileInput(name, email);
    if (validationErrors.length > 0) {
        alert('Error: ' + validationErrors.join(', '));
        return;
    }

    fetch('https://api.example.com/user/profile/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email })
    })
    .then(function(response) {
        // REVIEW MISSING: Check response.ok before treating this response as success.
        return response.json();
    })
    .then(function(updatedProfile) {
        userProfile = updatedProfile;
        alert('Profile updated successfully!');
        // REVIEW CHECK: A request callback must not render this view after navigation has changed.
        renderProfile();
    })
    .catch(function(err) {
        alert('Failed to update profile: ' + err);
    });
}

// ✅ Test function for validation
function testValidateProfile() {
    console.assert(validateProfileInput("", "test@example.com").length > 0, "Should require name");
    console.assert(validateProfileInput("John", "invalidEmail").length > 0, "Should require valid email");
    console.assert(validateProfileInput("John", "john@example.com").length === 0, "Valid input passes");
}

// Initialize dashboard and run tests
window.onload = function() {
    initDashboard();
    testValidateProfile();
};

/**
 * Review the existing test function (testValidateProfile) in "profileDashboard.js."
Identify and propose specific improvements to increase test coverage and enhance
the test structure. In your response, address:

- How to cover additional edge cases
- Writing granular tests
- The benefits of using a structured test framework
- Global Statemanagement
- Any changes to async Methods
- Any suggestion for minimal UI changes
- Explain the Code flow and elobrate each function in detail

 */
```

</details>

#### Problems in this snippet

- An unmatched }); after updateProfile() leaves a missing Save-button listener and causes a syntax error.
- Direct HTML concatenation exposes injected markup; use DOM text/value properties.
- No HTTP-status checks, stale-view protection, in-flight deduplication, or distinction between unloaded and empty posts.
- Granular validation and async/DOM tests are needed; the endpoint URLs are placeholders.

#### Corrected answer and explanation

##### G. Browser profile dashboard: syntax, requests, safe DOM and tests

**Source:** F11. This browser exercise appears in the backend sheet; `window`/`document` do not run in a plain Node process.

###### Exact problems

- `renderProfile` ends with `updateProfile(); });` without a matching Save-button listener. This is a syntax error; it should be inside `saveProfileBtn.addEventListener('click', ...)`.
- Profile and post values are concatenated into innerHTML, including an input value attribute. Untrusted HTML can be interpreted as markup. Use DOM nodes, textContent and input.value.
- Fetch never checks response.ok.
- An old response directly calls renderProfile/renderPosts even after the user switches views.
- An empty posts array doubles as “not loaded”, causing repeated requests for a valid empty result.
- Repeated navigation while loading can start duplicate requests.
- Initial invalid hashes are not normalized like later hash changes.
- `innerHTML +=` in a loop repeatedly parses/replaces the existing markup.
- Validation tests cover only three cases and console.assert does not provide a structured pass/fail test suite.

###### Corrected reference browser implementation

Requires `<div id="dashboardContainer"></div>`. The supplied api.example.com URLs are placeholders, so this code needs a real API or mocked fetch to run successfully. It assumes the update endpoint returns the saved profile as JSON.

```js
function validateProfileInput(name, email) {
  const errors = [];
  if (typeof name !== "string" || !name.trim()) errors.push("Name is required.");
  // Basic UI validation; the server must validate too.
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push("Valid email is required.");
  }
  return errors;
}

function createDashboard(container, fetchImpl = fetch) {
  const state = { profile: null, posts: null };
  const pending = new Map();
  let generation = 0;

  function element(tag, text) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    return node;
  }

  async function request(url, options) {
    const response = await fetchImpl(url, options);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
  }

  async function read(view) {
    if (state[view] !== null) return state[view];
    if (!pending.has(view)) {
      pending.set(view, request(`https://api.example.com/user/${view}`)
        .then((data) => { state[view] = data; return data; })
        .finally(() => pending.delete(view)));
    }
    return pending.get(view);
  }

  function currentView() {
    const hash = window.location.hash.slice(1);
    if (hash === "profile" || hash === "posts") return hash;
    window.history.replaceState(null, "", "#profile");
    return "profile";
  }

  function renderProfile(profile) {
    const name = element("input");
    name.value = profile.name ?? "";
    name.setAttribute("aria-label", "Name");
    const email = element("input");
    email.type = "email";
    email.value = profile.email ?? "";
    email.setAttribute("aria-label", "Email");
    const form = element("form");
    form.hidden = true;
    const save = element("button", "Save");
    save.type = "submit";
    const message = element("p");
    message.setAttribute("role", "status");
    form.append(name, email, save, message);
    const edit = element("button", "Edit Profile");
    edit.addEventListener("click", () => { form.hidden = false; });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const errors = validateProfileInput(name.value, email.value);
      if (errors.length) { message.textContent = errors.join(" "); return; }
      save.disabled = true;
      try {
        state.profile = await request("https://api.example.com/user/profile/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.value.trim(), email: email.value.trim() }),
        });
        if (currentView() === "profile") showView();
      } catch (failure) {
        message.textContent = failure.message;
      } finally {
        save.disabled = false;
      }
    });

    container.replaceChildren(
      element("h2", "User Profile"),
      element("p", `Name: ${profile.name}`),
      element("p", `Email: ${profile.email}`), edit, form
    );
  }

  function renderPosts(posts) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(element("h2", "User Posts"));
    for (const post of posts) {
      const article = element("article");
      article.append(element("h3", post.title), element("p", post.content));
      fragment.appendChild(article);
    }
    if (!posts.length) fragment.appendChild(element("p", "No posts yet."));
    container.replaceChildren(fragment);
  }

  async function showView() {
    const view = currentView();
    const version = ++generation;
    container.textContent = "Loading...";
    try {
      const data = await read(view);
      if (version !== generation) return;
      if (view === "profile") renderProfile(data);
      else renderPosts(data);
    } catch (failure) {
      if (version === generation) container.textContent = failure.message;
    }
  }

  window.addEventListener("hashchange", showView);
  return {
    showView,
    dispose() { generation++; window.removeEventListener("hashchange", showView); },
  };
}

// const dashboard = createDashboard(document.getElementById("dashboardContainer"));
// dashboard.showView();
```

**Explanation:** Use null to mean “not loaded,” cache even an empty result, deduplicate in-flight reads, and use a generation counter to ignore outdated screen updates. Keep related state together. Display error/loading feedback and disable Save while updating. Authentication, authorization and server-side validation are required in the real API; they are not implemented by browser-side checks. The original backend/server code is absent, so server-side SQL injection or CSRF behavior cannot be established from this browser snippet alone.

**Test answer:** Write separate assertions for missing/whitespace/null names, empty/invalid emails, valid input, malformed responses, HTTP/network failures, Save click, unsafe-looking text displayed literally, invalid initial hash, rapid view changes, empty posts caching, and repeated initialization/disposal. Use mocked fetch for deterministic async tests. A test framework provides isolated cases, awaited assertions and a failing process exit status; browser DOM tests verify handlers and rendering. Do not treat API placeholders as an existing service.

## Javascript - BE!F12

### Question 1 in this cell

Parse tollbooth entries correctly and count completed journeys. In the longer versions, identify speeding journeys. The shortened report instead asks for unique cars with both event types.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```js
Coding Question
/*
"use strict";

const assert = require('assert');
const fs = require("fs");

/*
We are writing software to analyze logs for toll booths on a highway. This highway is a divided highway with limited access; the only way on to or off of the highway is through a toll booth.

There are three types of toll booths:
* ENTRY (E in the diagram) toll booths, where a car goes through a booth as it enters the highway.
* EXIT (X in the diagram) toll booths, where a car goes through a booth as it exits the highway.
* MAINROAD (M in the diagram), which have sensors that record a license plate as a car drives through at full speed.


        Exit Booth                         Entry Booth
            |                                   |
            X                                   E
             \                                 /
---<------------<---------M---------<-----------<---------<----
                                         (West-bound side)

===============================================================

                                         (East-bound side)
------>--------->---------M--------->--------->--------->------
             /                                 \
            E                                   X
            |                                   |
        Entry Booth                         Exit Booth


For our first task:
1-1) Read through and understand the code and comments below. Feel free to run the code and tests.
1-2) The tests are not passing due to a bug in the code. Make the necessary changes to LogEntry to fix the bug.
*/

/*
We are interested in how many people are using the highway, and so we would like to count how many complete journeys are taken in the log file.

A complete journey consists of:
* A driver entering the highway through an ENTRY toll booth.
* The driver passing through some number of MAINROAD toll booths (possibly 0).
* The driver exiting the highway through an EXIT toll booth.

For example, the following excerpt of log lines contains complete journeys for the cars with JOX304 and THX138:

.
.
.
90750.191 JOX304 250E ENTRY
91081.684 JOX304 260E MAINROAD
91082.101 THX138 110E ENTRY
91483.251 JOX304 270E MAINROAD
91873.920 THX138 120E MAINROAD
91874.493 JOX304 280E EXIT
.
.
91982.102 THX138 290E EXIT
92301.302 THX138 300E ENTRY
92371.302 THX138 310E EXIT



.

→ This log contains 3 complete journeys:
  • JOX304: 1 journey
  • THX138: 2 journeys

You may assume that the log only contains complete journeys, and there are no missing entries.

2-1) Write a function in LogFile named countJourneys() that returns how many
     complete journeys there are in the given LogFile.
*/

class LogEntry {
  /**
   * Represents an entry from a single log line.
   * 
   * Log lines look like this in the file:
   * 34400.409 SXY288 210E ENTRY
   * 
   * Where:
   * -> 34400.409 is the timestamp in seconds since the software was started.
   * -> SXY288 is the license plate of the vehicle passing through the toll booth.
   * -> 210E is the location and traffic direction of the toll booth. Here, the
   *      toll booth is at 210 kilometers from the start of the tollway, and the E
   *      indicates that the toll booth was on the east-bound traffic side.
   *      Tollbooths are placed every ten kilometers.
   * -> ENTRY indicates which type of toll booth the vehicle went through. This is
   *      one of "ENTRY", "EXIT", or "MAINROAD".
   */
  constructor(logLine) {
    // REVIEW IMPROVEMENT: trim().split(/\s+/) tolerates repeated spaces and tabs.
    const tokens = logLine.split(' ');
    // REVIEW CORRECT: This copy already converts fractional timestamps to Number.
    this.timestamp = Number(tokens[0]);
    this.license_plate = tokens[1];
    this.booth_type = tokens[3];
    this.location = parseInt(tokens[2].slice(0, -1));
    const directionLetter = tokens[2].slice(-1);
    if (directionLetter === 'E') {
      this.direction = 'EAST';
    } else if (directionLetter === 'W') {
      this.direction = 'WEST';
    } else {
      throw new Error('Invalid direction letter');
    }
  }

  toString() {
    return `<LogEntry timestamp: ${this.timestamp} license: ${this.license_plate} location: ${this.location} direction: ${this.direction} booth type: ${this.booth_type}>`;
  }
}

class LogFile {
  /**
   * Represents a file containing a number of log lines, converted to LogEntry objects.
   */
  constructor(fileContents) {
    this.logEntries = [];
    const lines = fileContents.split('\n');
    for (const line of lines) {
      if (line.trim()) {
        const logEntry = new LogEntry(line.trim());
        this.logEntries.push(logEntry);
      }
    }
  }

  get length() {
    return this.logEntries.length;
  }

  item(index) {
    return this.logEntries[index];
  }
}

// REVIEW ERROR: Tests call logFile.countJourneys(); implement it inside LogFile, not as this empty standalone function.
function countJourneys(logs){
  
}

const testMethods = {
  // These tests are not meant to be exhaustive, and primarily show usage.
    testLogFile: () => {
    const logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_small.log", "utf-8"));
    assert(logFile.length === 13);
    for (const entry of logFile.logEntries) {
      assert(entry instanceof LogEntry);
    }
  },
  testLogEntry: () => {
    let logLine = '44776.619 KTB918 310E MAINROAD';
    let logEntry = new LogEntry(logLine);
    assert(logEntry.timestamp === 44776.619);
    assert(logEntry.license_plate === 'KTB918');
    assert(logEntry.location === 310);
    assert(logEntry.direction === 'EAST');
    assert(logEntry.booth_type === 'MAINROAD');

    logLine = '52160.132 ABC123 400W ENTRY';
    logEntry = new LogEntry(logLine);
    assert(logEntry.timestamp === 52160.132);
    assert(logEntry.license_plate === 'ABC123');
    assert(logEntry.location === 400);
    assert(logEntry.direction === 'WEST');
    assert(logEntry.booth_type === 'ENTRY');
  },
  
  testCountJourneys: () => {
    let logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_small.log", "utf-8"));
    assert.strictEqual(logFile.countJourneys(), 3);
  
    logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_medium.log", "utf-8"));
    assert.strictEqual(logFile.countJourneys(), 63);
  },
}

// run all tests
Object.getOwnPropertyNames(testMethods).forEach((func) => {
  try {
    console.log(`Running ${func}`);
    testMethods[func]();
    console.log('OK');
  } catch (e) {
    console.log('FAIL');
    console.log(e);
  }
  console.log('');
});

*/
```

</details>

#### Problems in this snippet

- Timestamp conversion is already present in this copy.
- countJourneys is a standalone empty function, but tests call a LogFile instance method.
- The copied outer comment delimiters must be cleaned; fixture files are not attached.

#### Corrected answer and explanation

##### F. Tollbooth parsing, completed journeys and speeding

**Sources:** F7, F12, F22, F26, F27.

###### Errors and differences between rows

- F7/F26 describe a string-versus-number timestamp bug. Convert with `Number`, not parseInt, because timestamps include fractions.
- F12/F22/F27 **already use `Number(tokens[0])`**. Do not add a nonexistent conversion fix to those copies.
- `split(' ')` is fragile with repeated whitespace; use trim/split(/\s+/).
- F12 leaves a standalone empty `countJourneys(logs)` function, while tests call `logFile.countJourneys()`. Implement the method on LogFile.
- F22/F27 already count EXIT events correctly under the explicit complete-log assumption. Their missing task is catchSpeeders.
- F12 contains copied unmatched/nested comment delimiters. Clean the wrapper before running it.
- Test log files under `/content/test/...` are not included in the workbook; the original file-based totals cannot be independently rerun without those fixtures.

###### Corrected classes

```js
class LogEntry {
  constructor(logLine) {
    const tokens = logLine.trim().split(/\s+/);
    if (tokens.length !== 4) throw new Error("Expected four log fields");
    const [timestamp, plate, locationDirection, type] = tokens;
    const match = /^(\d+)([EW])$/.exec(locationDirection);
    if (!match) throw new Error("Invalid location/direction");
    if (!["ENTRY", "EXIT", "MAINROAD"].includes(type)) throw new Error("Invalid booth type");
    this.timestamp = Number(timestamp);
    if (!Number.isFinite(this.timestamp)) throw new Error("Invalid timestamp");
    this.license_plate = plate;
    this.location = Number(match[1]);
    this.direction = match[2] === "E" ? "EAST" : "WEST";
    this.booth_type = type;
  }
  toString() {
    return `<LogEntry timestamp: ${this.timestamp} license: ${this.license_plate} location: ${this.location} direction: ${this.direction} booth type: ${this.booth_type}>`;
  }
}

class LogFile {
  constructor(contents) {
    this.logEntries = contents.split(/\r?\n/).filter((line) => line.trim())
      .map((line) => new LogEntry(line));
  }
  get length() { return this.logEntries.length; }
  item(index) { return this.logEntries[index]; }

  countJourneys() {
    // The question guarantees complete journeys and no missing entries.
    return this.logEntries.reduce((count, entry) =>
      count + (entry.booth_type === "EXIT" ? 1 : 0), 0);
  }

  catchSpeeders() {
    const byPlate = new Map();
    for (const entry of this.logEntries) {
      if (!byPlate.has(entry.license_plate)) byPlate.set(entry.license_plate, []);
      byPlate.get(entry.license_plate).push(entry);
    }
    const tickets = [];
    for (const [plate, entries] of byPlate) {
      entries.sort((a, b) => a.timestamp - b.timestamp);
      let journey = null;
      for (const entry of entries) {
        if (entry.booth_type === "ENTRY") {
          journey = { previous: entry, segments120: 0, unsafe: false };
          continue;
        }
        if (!journey) continue; // Ignore driving outside the highway.
        const previous = journey.previous;
        const seconds = entry.timestamp - previous.timestamp;
        const distance = Math.abs(entry.location - previous.location);
        if (seconds <= 0 || entry.direction !== previous.direction) {
          throw new Error("Invalid journey sequence");
        }
        // Individual 10km speed cannot be inferred from a gap of multiple booths.
        if (distance !== 10) throw new Error("Expected consecutive 10km booth records");
        const speed = distance * 3600 / seconds;
        if (speed >= 130) journey.unsafe = true;
        if (speed >= 120) journey.segments120++;
        if (journey.segments120 >= 2) journey.unsafe = true;
        journey.previous = entry;

        if (entry.booth_type === "EXIT") {
          if (journey.unsafe) tickets.push(plate);
          journey = null;
        }
      }
    }
    return tickets;
  }
}
```

**Explanation:** A journey is ENTRY through EXIT; MAINROAD events do not start or end it. Calculate km/h as distance * 3600 / elapsed seconds. Use absolute distance for westbound journeys. Flag either one segment >=130 or any two segments >=120 (not necessarily adjacent). Append at most one ticket per journey, but allow the same plate again for a different journey. Sorting per vehicle supports interleaved logs; it is O(L log L) overall, or O(L) processing if per-vehicle chronological order is already guaranteed. Complete 10km sensor records are assumed; gaps do not prove individual-segment speeds.

###### Different task in F7/F26: count cars, not journeys

Those shortened reports ask for cars with at least one entry and exit. That counts a car once, even if it made two trips. Do not confuse it with F12/F22/F27, which explicitly count trips.

```js
function countCarsWithEntryAndExit(entries) {
  const flags = new Map();
  for (const entry of entries) {
    const plate = entry.license_plate;
    if (!flags.has(plate)) flags.set(plate, { entry: false, exit: false });
    const state = flags.get(plate);
    const type = entry.booth_type.toUpperCase();
    if (type === "ENTRY") state.entry = true;
    if (type === "EXIT") state.exit = true;
  }
  return [...flags.values()].filter((value) => value.entry && value.exit).length;
}
```

This matches the simplified “has both event types” statement; for actually paired valid trips use an ENTRY/EXIT state machine. Clarify which result is required.

## Javascript - BE!F13

### Question 1 in this cell

Fix failing StockCollection statistics tests and, where requested, implement getBiggestChange with the associated dates.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```js
"use strict";
/*
We are developing a stock trading data management software that tracks the prices of different stocks over time and provides useful statistics.

The program includes three classes: `Stock`, `PriceRecord`, and `StockCollection`.

Classes:
* The `Stock` class represents data about a specific stock.
* The `PriceRecord` class holds information about a single price record for a stock.
* The `StockCollection` class manages a collection of price records for a particular stock and provides methods to retrieve useful statistics about the stock's prices.

To begin with, we present you with two tasks:
1-1) Read through and understand the code below. Please take as much time as necessary, and feel free to run the code.
1-2) The test for StockCollection is not passing due to a bug in the code. Make the necessary changes to StockCollection to fix the bug.
*/
/*
2) We want to add a new function called "getBiggestChange" to the StockCollection class. This function calculates and returns the largest change in stock price between any two consecutive days in the price records of a stock along with the dates of the change in a list. For example, let's consider the following price records of a stock:

Price Records:
Price:  110         112         90          105
Date:   2023-06-29  2023-07-01  2023-06-25  2023-07-06

Stock price changes (sorted based on date):
Date:     2023-06-25  ->  2023-06-29  ->  2023-07-01 ->  2023-07-06
Price:        90      ->      110     ->     112     ->     105
Change:              +20              +2             -7

In this case, the biggest change in the stock price was +20, which occurred between 2023-06-25 and 2023-06-29. In this case, the function should return [20, "2023-06-25", "2023-06-29"]

Two days are considered consecutive if there are no other days' data in between them in the price records based on their dates.

To assist you in testing this new function, we have provided the testGetBiggestChange function.
*/
const assert = require("assert");

class Stock {
  /* Data about a particular stock. */
  constructor(symbol, name) {
    this.symbol = symbol; // String, the symbol of the stock
    this.name = name; // String, the name of the stock
  }

  isEqual(other) {
    if (!(other instanceof this.constructor)) return false;
    return this.symbol === other.symbol && this.name === other.name;
  }
}

class PriceRecord {
  /* Data and methods about a single price record of a stock. */
  constructor(stock, price, date) {
    this.stock = stock; // a Stock object representing the stock
    this.price = price; // int, the price of the stock
    this.date = date; // str, the date of the price record is of the format "YYYY-MM-DD"
  }

  isEqual(other) {
    if (!(other instanceof this.constructor)) return false;
    return this.stock.isEqual(other.stock) && this.price === other.price && this.date === other.date;
  }
}

class StockCollection {
  /*
   * Data for a collection of price records for a particular stock, and methods for getting
   * useful statistics about the stock's prices.
   */
  constructor(stock) {
    this.priceRecords = []; // list of PriceRecord objects, the price records for this particular stock
    this.stock = stock; // stock, the Stock this StockCollection is for
  }

  getNumPriceRecords() {
    /* Returns the number of PriceRecords in this StockCollection */
    return this.priceRecords.length;
  }

  addPriceRecord(priceRecord) {
    /* Adds a PriceRecord to this StockCollection. */
    if (!priceRecord.stock.isEqual(this.stock)) {
      throw new Error("PriceRecord's Stock is not the same as the StockCollection's");
    }
    this.priceRecords.push(priceRecord);
  }

  getMaxPrice() {
    /* Return the maximum price recorded in this StockCollection. */
    // REVIEW ERROR: An empty collection returns -Infinity; tests require null.
    return Math.max(...this.priceRecords.map((priceRecord) => priceRecord.price));
  }

  getMinPrice() {
    /* Return the minimum price recorded in this StockCollection. */
    // REVIEW ERROR: An empty collection returns Infinity; tests require null.
    return Math.min(...this.priceRecords.map((priceRecord) => priceRecord.price));
  }

  getAvgPrice() {
    /* Return the average price recorded in this StockCollection. */
    const total = this.priceRecords.reduce((acc, priceRecord) => acc + priceRecord.price, 0);
    // REVIEW ERROR: Empty length causes 0/0 (NaN); tests require null.
    return total / this.priceRecords.length;
  }
}

const makeStockCollection = function (stock, priceData) {
  // Create a new StockCollection for test purposes.
  const stockCollection = new StockCollection(stock);
  for (const [price, date] of priceData) {
    const priceRecord = new PriceRecord(stock, price, date);
    stockCollection.addPriceRecord(priceRecord);
  }
  return stockCollection;
};

const testMethods = {
  testPriceRecord: () => {
    /* Test basic PriceRecord functionality */
    const testStock = new Stock("AAPL", "Apple Inc.");
    const testPriceRecord = new PriceRecord(testStock, 100, "2023-07-01");
    assert.strictEqual(testPriceRecord.stock, testStock);
    assert.strictEqual(testPriceRecord.price, 100);
    assert.strictEqual(testPriceRecord.date, "2023-07-01");
  },
  testStockCollection: () => {
    /* Test basic StockCollection functionality */
    const testStock = new Stock("AAPL", "Apple Inc.");
    const stockCollection = new StockCollection(testStock);
    assert.strictEqual(stockCollection.getNumPriceRecords(), 0);
    assert.strictEqual(stockCollection.getMaxPrice(), null);
    assert.strictEqual(stockCollection.getMinPrice(), null);
    assert.strictEqual(stockCollection.getAvgPrice(), null);

    /* Price Records:
     * Price:  110         112         90          105
     * Date:   2023-06-29  2023-07-01  2023-06-28  2023-07-06
     */
    const priceData = [
      [110, "2023-06-29"],
      [112, "2023-07-01"],
      [90, "2023-06-28"],
      [105, "2023-07-06"],
    ];
    const testStock2 = new Stock("AAPL", "Apple Inc.");
    const stockCollection2 = makeStockCollection(testStock2, priceData);
    assert.strictEqual(stockCollection2.getNumPriceRecords(), priceData.length);
    assert.strictEqual(stockCollection2.getMaxPrice(), 112);
    assert.strictEqual(stockCollection2.getMinPrice(), 90);
    assert.ok(Math.abs(stockCollection2.getAvgPrice() - 104.25) < 0.1);
  },
  // REVIEW MISSING: The tests call getBiggestChange, but the class has no such method.
  testGetBiggestChange: () => {
    /* Test the getBiggestChange method */
    const testStock = new Stock("AAPL", "Apple Inc.");
    const stockCollection = new StockCollection(testStock);
    assert.strictEqual(stockCollection.getBiggestChange(), null);

    /* Price Records:
     * Price:  110         112         90          105
     * Date:   2023-06-29  2023-07-01  2023-06-25  2023-07-06
     */
    const priceData = [
      [110, "2023-06-29"],
      [112, "2023-07-01"],
      [90, "2023-06-25"],
      [105, "2023-07-06"],
    ];
    const stockCollection2 = makeStockCollection(testStock, priceData);
    assert.deepStrictEqual(stockCollection2.getBiggestChange(), [20, "2023-06-25", "2023-06-29"]);

    /* Price Records:
     * Price:  200         210         190          180
     * Date:   2000-01-04  1999-12-30  2000-01-03  2000-01-01
     */
    const priceData2 = [
      [200, "2000-01-04"],
      [210, "1999-12-30"],
      [190, "2000-01-03"],
      [180, "2000-01-01"],
    ];
    const stockCollection3 = makeStockCollection(testStock, priceData2);
    assert.deepStrictEqual(stockCollection3.getBiggestChange(), [-30, "1999-12-30", "2000-01-01"]);
  },
}

// run all tests
Object.getOwnPropertyNames(testMethods).forEach((func) => {
  try {
    console.log(`Running ${func}`);
    testMethods[func]();
    console.log('OK');
  } catch (e) {
    console.log('FAIL');
    console.log(e);
  }
  console.log('');
});
```

</details>

#### Problems in this snippet

- Empty statistics fail the null contract.
- getBiggestChange is missing. Sort a copy by date, compare absolute differences, return the signed difference and dates.

#### Corrected answer and explanation

##### E. StockCollection: empty statistics and biggest change

**Sources:** F10, F13, F14, F18, F19; referenced in F20.

###### What fails?

In F10/F13/F19:

```js
Math.max(...[]) // -Infinity, but tests expect null
Math.min(...[]) // Infinity, but tests expect null
0 / 0          // NaN, but tests expect null
```

Add empty-array guards. F14 **already has these guards**; do not claim they are still missing there. Its line `const getBiggestChange = function()` is syntactically incomplete and is outside the class. The test calls an instance method, so implement it inside StockCollection and remove that dangling declaration.

The biggest change is the largest **absolute magnitude**, but the returned value retains its sign. Otherwise the provided `-30` test would fail. Consecutive means consecutive available records in date order, not necessarily adjacent calendar days.

###### Corrected complete classes

```js
class Stock {
  constructor(symbol, name) {
    this.symbol = symbol;
    this.name = name;
  }
  isEqual(other) {
    return other instanceof Stock &&
      this.symbol === other.symbol && this.name === other.name;
  }
}

class PriceRecord {
  constructor(stock, price, date) {
    this.stock = stock;
    this.price = price;
    this.date = date;
  }
  isEqual(other) {
    return other instanceof PriceRecord && this.stock.isEqual(other.stock) &&
      this.price === other.price && this.date === other.date;
  }
}

class StockCollection {
  constructor(stock) {
    this.stock = stock;
    this.priceRecords = [];
  }
  getNumPriceRecords() {
    return this.priceRecords.length;
  }
  addPriceRecord(record) {
    if (!record.stock.isEqual(this.stock)) throw new Error("Stock mismatch");
    if (!Number.isFinite(record.price)) throw new TypeError("Invalid price");
    this.priceRecords.push(record);
  }
  getMaxPrice() {
    if (!this.priceRecords.length) return null;
    return this.priceRecords.reduce((maximum, record) =>
      Math.max(maximum, record.price), -Infinity);
  }
  getMinPrice() {
    if (!this.priceRecords.length) return null;
    return this.priceRecords.reduce((minimum, record) =>
      Math.min(minimum, record.price), Infinity);
  }
  getAvgPrice() {
    if (!this.priceRecords.length) return null;
    const total = this.priceRecords.reduce((sum, record) => sum + record.price, 0);
    return total / this.priceRecords.length;
  }
  getBiggestChange() {
    if (this.priceRecords.length < 2) return null;
    // Assumes valid ISO dates and one record per date, as in the test data.
    const sorted = [...this.priceRecords].sort((a, b) => a.date.localeCompare(b.date));
    let result = null;
    for (let i = 1; i < sorted.length; i++) {
      const previous = sorted[i - 1];
      const current = sorted[i];
      const change = current.price - previous.price;
      if (result === null || Math.abs(change) > Math.abs(result[0])) {
        result = [change, previous.date, current.date];
      }
    }
    return result;
  }
}
```

**Explanation:** Empty statistics return the exact contract's null. Copy before sorting to preserve insertion order. Compare absolute changes, return the signed difference and both dates. For ties, this code keeps the earliest pair in chronological order; clarify that policy and duplicate-date behavior if needed. Statistics are O(R), biggest change O(R log R), with O(R) sorting space.

**Expected answers:** `[110,112,90,105]` gives max 112, min 90, average 104.25. Sorted dates in the first change test give `[20,"2023-06-25","2023-06-29"]`. The second test gives `[-30,"1999-12-30","2000-01-01"]`.

## Javascript - BE!F14

### Question 1 in this cell

Fix failing StockCollection statistics tests and, where requested, implement getBiggestChange with the associated dates.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```js
"use strict";
/*
We are developing a stock trading data management software that tracks the prices of different stocks over time and provides useful statistics.

The program includes three classes: `Stock`, `PriceRecord`, and `StockCollection`.

Classes:
* The `Stock` class represents data about a specific stock.
* The `PriceRecord` class holds information about a single price record for a stock.
* The `StockCollection` class manages a collection of price records for a particular stock and provides methods to retrieve useful statistics about the stock's prices.

To begin with, we present you with two tasks:
1-1) Read through and understand the code below. Please take as much time as necessary, and feel free to run the code.
1-2) The test for StockCollection is not passing due to a bug in the code. Make the necessary changes to StockCollection to fix the bug.
*/
/*
2) We want to add a new function called "getBiggestChange" to the StockCollection class. This function calculates and returns the largest change in stock price between any two consecutive days in the price records of a stock along with the dates of the change in a list. For example, let's consider the following price records of a stock:

Price Records:
Price:  110         112         90          105
Date:   2023-06-29  2023-07-01  2023-06-25  2023-07-06

Stock price changes (sorted based on date):
Date:     2023-06-25  ->  2023-06-29  ->  2023-07-01 ->  2023-07-06
Price:        90      ->      110     ->     112     ->     105
Change:              +20              +2             -7

In this case, the biggest change in the stock price was +20, which occurred between 2023-06-25 and 2023-06-29. In this case, the function should return [20, "2023-06-25", "2023-06-29"]

Two days are considered consecutive if there are no other days' data in between them in the price records based on their dates.

To assist you in testing this new function, we have provided the testGetBiggestChange function.
*/
const assert = require("assert");

class Stock {
  /* Data about a particular stock. */
  constructor(symbol, name) {
    this.symbol = symbol; // String, the symbol of the stock
    this.name = name; // String, the name of the stock
  }

  isEqual(other) {
    if (!(other instanceof this.constructor)) return false;
    return this.symbol === other.symbol && this.name === other.name;
  }
}

class PriceRecord {
  /* Data and methods about a single price record of a stock. */
  constructor(stock, price, date) {
    this.stock = stock; // a Stock object representing the stock
    this.price = price; // int, the price of the stock
    this.date = date; // str, the date of the price record is of the format "YYYY-MM-DD"
  }

  isEqual(other) {
    if (!(other instanceof this.constructor)) return false;
    return this.stock.isEqual(other.stock) && this.price === other.price && this.date === other.date;
  }
}

class StockCollection {
  /*
   * Data for a collection of price records for a particular stock, and methods for getting
   * useful statistics about the stock's prices.
   */
  constructor(stock) {
    this.priceRecords = []; // list of PriceRecord objects, the price records for this particular stock
    this.stock = stock; // stock, the Stock this StockCollection is for
  }

  getNumPriceRecords() {
    /* Returns the number of PriceRecords in this StockCollection */
    return this.priceRecords.length;
  }

  addPriceRecord(priceRecord) {
    /* Adds a PriceRecord to this StockCollection. */
    if (!priceRecord.stock.isEqual(this.stock)) {
      throw new Error("PriceRecord's Stock is not the same as the StockCollection's");
    }
    this.priceRecords.push(priceRecord);
  }

  getMaxPrice() {
    if(this.priceRecords.length === 0) return null;
    /* Return the maximum price recorded in this StockCollection. */
    return Math.max(...this.priceRecords.map((priceRecord) => priceRecord.price));
  }

  getMinPrice() {
    if(this.priceRecords.length === 0) return null;
    /* Return the minimum price recorded in this StockCollection. */
    return Math.min(...this.priceRecords.map((priceRecord) => priceRecord.price));
  }

  getAvgPrice() {
    if(this.priceRecords.length === 0) return null;
    /* Return the average price recorded in this StockCollection. */
    const total = this.priceRecords.reduce((acc, priceRecord) => acc + priceRecord.price, 0);
    return total / this.priceRecords.length;
  }
}

const makeStockCollection = function (stock, priceData) {
  // Create a new StockCollection for test purposes.
  const stockCollection = new StockCollection(stock);
  for (const [price, date] of priceData) {
    const priceRecord = new PriceRecord(stock, price, date);
    stockCollection.addPriceRecord(priceRecord);
  }
  return stockCollection;
};

// REVIEW ERROR: Incomplete function declaration; implement getBiggestChange as a StockCollection method.
const getBiggestChange = function()

const testMethods = {
  testPriceRecord: () => {
    /* Test basic PriceRecord functionality */
    const testStock = new Stock("AAPL", "Apple Inc.");
    const testPriceRecord = new PriceRecord(testStock, 100, "2023-07-01");
    assert.strictEqual(testPriceRecord.stock, testStock);
    assert.strictEqual(testPriceRecord.price, 100);
    assert.strictEqual(testPriceRecord.date, "2023-07-01");
  },
  testStockCollection: () => {
    /* Test basic StockCollection functionality */
    const testStock = new Stock("AAPL", "Apple Inc.");
    const stockCollection = new StockCollection(testStock);
    assert.strictEqual(stockCollection.getNumPriceRecords(), 0);
    assert.strictEqual(stockCollection.getMaxPrice(), null);
    assert.strictEqual(stockCollection.getMinPrice(), null);
    assert.strictEqual(stockCollection.getAvgPrice(), null);

    /* Price Records:
     * Price:  110         112         90          105
     * Date:   2023-06-29  2023-07-01  2023-06-28  2023-07-06
     */
    const priceData = [
      [110, "2023-06-29"],
      [112, "2023-07-01"],
      [90, "2023-06-28"],
      [105, "2023-07-06"],
    ];
    const testStock2 = new Stock("AAPL", "Apple Inc.");
    const stockCollection2 = makeStockCollection(testStock2, priceData);
    assert.strictEqual(stockCollection2.getNumPriceRecords(), priceData.length);
    assert.strictEqual(stockCollection2.getMaxPrice(), 112);
    assert.strictEqual(stockCollection2.getMinPrice(), 90);
    assert.ok(Math.abs(stockCollection2.getAvgPrice() - 104.25) < 0.1);
  },
  
  testGetBiggestChange: () => {
    /* Test the getBiggestChange method */
    const testStock = new Stock("AAPL", "Apple Inc.");
    const stockCollection = new StockCollection(testStock);
    assert.strictEqual(stockCollection.getBiggestChange(), null);

    /* Price Records:
     * Price:  110         112         90          105
     * Date:   2023-06-29  2023-07-01  2023-06-25  2023-07-06
     */
    const priceData = [
      [110, "2023-06-29"],
      [112, "2023-07-01"],
      [90, "2023-06-25"],
      [105, "2023-07-06"],
    ];
    const stockCollection2 = makeStockCollection(testStock, priceData);
    assert.deepStrictEqual(stockCollection2.getBiggestChange(), [20, "2023-06-25", "2023-06-29"]);

    /* Price Records:
     * Price:  200         210         190          180
     * Date:   2000-01-04  1999-12-30  2000-01-03  2000-01-01
     */
    const priceData2 = [
      [200, "2000-01-04"],
      [210, "1999-12-30"],
      [190, "2000-01-03"],
      [180, "2000-01-01"],
    ];
    const stockCollection3 = makeStockCollection(testStock, priceData2);
    assert.deepStrictEqual(stockCollection3.getBiggestChange(), [-30, "1999-12-30", "2000-01-01"]);
  },
}

// run all tests
Object.getOwnPropertyNames(testMethods).forEach((func) => {
  try {
    console.log(`Running ${func}`);
    testMethods[func]();
    console.log('OK');
  } catch (e) {
    console.log('FAIL');
    console.log(e);
  }
  console.log('');
});
```

</details>

#### Problems in this snippet

- Empty-statistic guards are already implemented correctly.
- const getBiggestChange = function() is syntactically incomplete and outside the class. Implement the method on StockCollection.

#### Corrected answer and explanation

##### E. StockCollection: empty statistics and biggest change

**Sources:** F10, F13, F14, F18, F19; referenced in F20.

###### What fails?

In F10/F13/F19:

```js
Math.max(...[]) // -Infinity, but tests expect null
Math.min(...[]) // Infinity, but tests expect null
0 / 0          // NaN, but tests expect null
```

Add empty-array guards. F14 **already has these guards**; do not claim they are still missing there. Its line `const getBiggestChange = function()` is syntactically incomplete and is outside the class. The test calls an instance method, so implement it inside StockCollection and remove that dangling declaration.

The biggest change is the largest **absolute magnitude**, but the returned value retains its sign. Otherwise the provided `-30` test would fail. Consecutive means consecutive available records in date order, not necessarily adjacent calendar days.

###### Corrected complete classes

```js
class Stock {
  constructor(symbol, name) {
    this.symbol = symbol;
    this.name = name;
  }
  isEqual(other) {
    return other instanceof Stock &&
      this.symbol === other.symbol && this.name === other.name;
  }
}

class PriceRecord {
  constructor(stock, price, date) {
    this.stock = stock;
    this.price = price;
    this.date = date;
  }
  isEqual(other) {
    return other instanceof PriceRecord && this.stock.isEqual(other.stock) &&
      this.price === other.price && this.date === other.date;
  }
}

class StockCollection {
  constructor(stock) {
    this.stock = stock;
    this.priceRecords = [];
  }
  getNumPriceRecords() {
    return this.priceRecords.length;
  }
  addPriceRecord(record) {
    if (!record.stock.isEqual(this.stock)) throw new Error("Stock mismatch");
    if (!Number.isFinite(record.price)) throw new TypeError("Invalid price");
    this.priceRecords.push(record);
  }
  getMaxPrice() {
    if (!this.priceRecords.length) return null;
    return this.priceRecords.reduce((maximum, record) =>
      Math.max(maximum, record.price), -Infinity);
  }
  getMinPrice() {
    if (!this.priceRecords.length) return null;
    return this.priceRecords.reduce((minimum, record) =>
      Math.min(minimum, record.price), Infinity);
  }
  getAvgPrice() {
    if (!this.priceRecords.length) return null;
    const total = this.priceRecords.reduce((sum, record) => sum + record.price, 0);
    return total / this.priceRecords.length;
  }
  getBiggestChange() {
    if (this.priceRecords.length < 2) return null;
    // Assumes valid ISO dates and one record per date, as in the test data.
    const sorted = [...this.priceRecords].sort((a, b) => a.date.localeCompare(b.date));
    let result = null;
    for (let i = 1; i < sorted.length; i++) {
      const previous = sorted[i - 1];
      const current = sorted[i];
      const change = current.price - previous.price;
      if (result === null || Math.abs(change) > Math.abs(result[0])) {
        result = [change, previous.date, current.date];
      }
    }
    return result;
  }
}
```

**Explanation:** Empty statistics return the exact contract's null. Copy before sorting to preserve insertion order. Compare absolute changes, return the signed difference and both dates. For ties, this code keeps the earliest pair in chronological order; clarify that policy and duplicate-date behavior if needed. Statistics are O(R), biggest change O(R log R), with O(R) sorting space.

**Expected answers:** `[110,112,90,105]` gives max 112, min 90, average 104.25. Sorted dates in the first change test give `[20,"2023-06-25","2023-06-29"]`. The second test gives `[-30,"1999-12-30","2000-01-01"]`.

## Javascript - BE!F15

### Question 1 in this cell

Debug the MySQL/string-processing code, correct reverseWord, improve readability/data access, and explain test cases.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```js
// REVIEW ERROR: A single slash does not start a comment; use //.
/ 1. Function to connect to MySQL using a connection string
function connectToMySQL(connectionString) {
    const connection = mysql.createConnection(connectionString);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL successfully!');
    });

    return connection;
}

// 2. Function to reverse every word in a sentence and reverse word order
function reverseSentence(sentence) {
    let words = [];
    let currentWord = '';

    // Manually split sentence into words
    for (let i = 0; i < sentence.length; i++) {
        const char = sentence[i];
        if (char === ' ') {
            words.push(currentWord);
            currentWord = '';
        } else {
            currentWord += char;
        }
    }
    words.push(currentWord); // Push last word

    // Reverse each word using helper function
    for (let i = 0; i < words.length; i++) {
        words[i] = reverseWord(words[i]);
    }

    // Reverse word order manually
    let reversedSentence = '';
    for (let i = words.length - 1; i >= 0; i--) {
        reversedSentence += words[i];
        if (i !== 0) reversedSentence += ' ';
    }

    return reversedSentence;
}

// 3. Helper function to reverse letters in a single word (manual)
function reverseWord(word) {
    let reversed = '';
    // REVIEW ERROR: word.length is out of bounds; start at word.length - 1.
    for (let i = word.length ; i >= 0; i--) {
        reversed += word[i];
    }
    return reversed;
}

// Questions Asked: 

1. Debug the code and come up with improvements
2. What could be missing in the reverseWord function that is resulting in an bug ? (solution: it should be : for (let i = word.length =1; i >= 0; i--) {)
3. How many test cases can be written for all the above fundtions and what are those ?
4. Fix the issue based on the failiing test cases.
```

</details>

#### Problems in this snippet

- reverseWord starts at word.length, which is outside the string and adds undefined. Start at word.length - 1.
- The proposed fix in the report uses an assignment typo (=1); it is not the correct subtraction.
- The connection helper logs errors instead of exposing readiness/failure clearly; import/configuration/query code is incomplete.
- A lone / before the introductory comment is invalid if present literally.

#### Corrected answer and explanation

##### H. MySQL access, reverseWord and reverseSentence

**Sources:** F15; descriptions/reference requests in F21, F25, F28.

###### Exact bug

```js
// Wrong: index word.length is out of bounds.
for (let i = word.length; i >= 0; i--) {
  reversed += word[i];
}

// Correct:
for (let i = word.length - 1; i >= 0; i--) {
  reversed += word[i];
}
```

For `abc`, the wrong loop appends undefined before c,b,a. The workbook's suggested `word.length =1` is itself a typo: the correction is **minus one**, not assignment. The initial `/ 1. Function...` is also invalid JavaScript if copied literally; use `//`.

###### Corrected string functions

```js
function reverseWord(word) {
  if (typeof word !== "string") throw new TypeError("Expected a string");
  const characters = Array.from(word);
  const result = [];
  for (let i = characters.length - 1; i >= 0; i--) result.push(characters[i]);
  return result.join("");
}

function reverseSentence(sentence) {
  if (typeof sentence !== "string") throw new TypeError("Expected a string");
  // Preserve repeated ASCII spaces like the supplied manual split.
  return sentence.split(" ").map(reverseWord).reverse().join(" ");
}
```

**Explanation:** Reverse letters in each word, then reverse word order, as the source requests. `Hello world` becomes `dlrow olleH`. Reversing only word order would instead give `world Hello` and would not satisfy this source. Array.from handles Unicode code points, not every grapheme cluster; ask about combined characters if relevant.

###### Database code: what can and cannot be concluded

The supplied `connectToMySQL` returns a connection before its asynchronous callback completes and only logs connection failures. That timing is not automatically a bug with a driver that queues queries, but it makes readiness/failure hard for callers to handle. The `mysql` import is not shown. Query text and fetch-string code are absent, so SQL injection cannot be proved from the snippet alone.

For one connection, return a promise-based connection and let the caller catch failures. For a long-running backend, reuse a pool instead of opening one connection for every sentence. Keep credentials in configuration and use bound SQL parameters. The following is an illustrative mysql2 implementation; table/column names are assumed, not provided by the workbook.

```js
// Database module: requires mysql2 in the actual project.
// import mysql from "mysql2/promise";
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
// });

function makeReadAndReverseSentence(pool) {
  return async function readAndReverseSentence(id) {
    if (!Number.isSafeInteger(id) || id <= 0) throw new TypeError("Invalid sentence ID");
    const [rows] = await pool.execute(
      "SELECT content FROM sentences WHERE id = ? LIMIT 1", [id]
    );
    if (!rows.length) return null;
    return reverseSentence(rows[0].content);
  };
}
```

**Tests:** empty string, one letter, spaces, multiple words, repeated spaces, punctuation, non-string input, non-BMP character, database missing row/failure, and invalid ID. Mock the pool to verify query parameters without exposing credentials. A live database integration test is separate.

## Javascript - BE!F16

### Question 1 in this cell

Fix paid gym membership counts and implement addWorkout and getAverageWorkoutDurations.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```js
"use strict";
/*
We are building a program to manage a gym's membership. The gym has multiple members, each with a unique ID, name, and membership status. The program allows gym staff to add new members, update members status, and get membership statistics.

Definitions:
* A "member" is an object that represents a gym member. It has properties for the ID, name, and membership status.
* A "membership" is a class which is used for managing members in the gym.

Coding Question 1:
To begin with, we present you with two tasks:
1-1) Read through and understand the code below. Please take as much time as necessary, and feel free to run the code.
1-2) The test for Membership is not passing due to a bug in the code. Make the necessary changes to Membership to fix the bug.
*/

// REVIEW ERROR: This copied question label is outside a comment and is not valid code.
Coding Question 2:
/*
We are currently updating our system to include information about workouts for our members. As part of this update, we have introduced the Workout class, which represents a single workout session for a member. Each object of the Workout class has a unique ID, as well as a start time and end time that are represented in the number of minutes spent from the start of the day. You can assume that all the Workouts are from the same day.

To implement these changes, we need to add two functions to the Membership class:

2.1) The `addWorkout` function should be used to add a workout session for a member. If the given member does not exist while calling this function, the workout can be ignored.

2.2) The `getAverageWorkoutDurations` function should calculate the average duration of workouts for each member in minutes and return the results as a map.

To assist you in testing these new functions, we have provided the testGetAverageWorkoutDurations function.
*/

const assert = require("assert");

class MembershipStatus {
  /*
  Membership Status is of three types: BRONZE, SILVER and GOLD.
  BRONZE is the default membership a new member gets.
  SILVER and GOLD are paid memberships for the gym.
  */
  static BRONZE = 1;
  static SILVER = 2;
  static GOLD = 3;
}

class Member {
  /* Data about a gym member. */
    constructor(memberId, name, membershipStatus) {
    this.memberId = memberId;
    this.name = name;
    this.membershipStatus = membershipStatus;
  }

  isEqual(other) {
    if (!(other instanceof Member)) {
      return false;
    }
    return (
      this.memberId === other.memberId &&
      this.name === other.name &&
      this.membershipStatus === other.membershipStatus
    );
  }

  toString() {
    return `Member ID: ${this.memberId}, Name: ${this.name}, Membership Status: ${this.membershipStatus}`;
  }
}

class Membership {
  /*
  Data for managing a gym membership, and methods which staff can
  use to perform any queries or updates.
  */
    constructor(members = []) {
    this.members = members;
    this.workouts = new Map();
  }

  addMember(member) {
    /* Adds a member to the gym */
    this.members.push(member);
  }

  updateMembership(memberId, membershipStatus) {
    /* Update membership of the given member */
    for (const member of this.members) {
      if (member.memberId === memberId) {
        member.membershipStatus = membershipStatus;
        break;
      }
    }
  }
  
  getMembershipStatistics() {
    /* Calculates and returns membership statistics for all members */
    const totalMembers = this.members.length;
    const totalPaidMembers = this.members.filter(
      (member) =>
        // REVIEW ERROR: GOLD members are also paid; include both statuses.
        member.membershipStatus === MembershipStatus.SILVER
    ).length;
    // REVIEW CHECK: For zero members, this divides 0 by 0; define the empty result.
    const conversionRate = (totalPaidMembers / totalMembers) * 100;

    return {
      totalMembers,
      totalPaidMembers,
      conversionRate,
    };
  }
}

class Workout {
  /*
  This class represents a single workout session for a member.
  Each object of the Workout class has a unique ID, as well as 
  a start time and end time that are represented in the number 
  of minutes spent from the start of the day.
  */
  constructor(id, startTime, endTime) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }
  

  getDuration() {
    return this.endTime - this.startTime;
  }
}

const testMethods = {
    testMember: () => {
    const testMember = new Member(1, "John Doe", MembershipStatus.BRONZE);
    assert.strictEqual(testMember.memberId, 1);
    assert.strictEqual(testMember.name, "John Doe");
    assert.strictEqual(testMember.membershipStatus, MembershipStatus.BRONZE);
  },
  testMembership: () => {
    const testMembership = new Membership();
    const testMember = new Member(1, "John Doe", MembershipStatus.BRONZE);
    testMembership.addMember(testMember);
    assert.strictEqual(testMembership.members.length, 1);
    assert.ok(testMembership.members[0].isEqual(testMember));

    testMembership.updateMembership(1, MembershipStatus.SILVER);
    assert.strictEqual(
      testMembership.members[0].membershipStatus,
      MembershipStatus.SILVER
    );

    const testMember2 = new Member(2, "Alex C", MembershipStatus.BRONZE);
    testMembership.addMember(testMember2);

    const testMember3 = new Member(3, "Marie C", MembershipStatus.GOLD);
    testMembership.addMember(testMember3);

    const testMember4 = new Member(4, "Joe D", MembershipStatus.SILVER);
    testMembership.addMember(testMember4);

    const testMember5 = new Member(5, "June R", MembershipStatus.BRONZE);
    testMembership.addMember(testMember5);

    const attendanceStats = testMembership.getMembershipStatistics();
    assert.strictEqual(attendanceStats.totalMembers, 5);
    assert.strictEqual(attendanceStats.totalPaidMembers, 3);
    assert.ok(Math.abs(attendanceStats.conversionRate - 60.00) < 0.1);
  },
  
    // REVIEW MISSING: The class does not implement the two workout methods used by this test.
    testGetAverageWorkoutDurations() {
    const testMembership = new Membership();
    const testMember = new Member(12, "John Doe", MembershipStatus.SILVER);
    testMembership.addMember(testMember);

    const testMember2 = new Member(22, "Alex Cleeve", MembershipStatus.BRONZE);
    testMembership.addMember(testMember2);

    const testMember3 = new Member(31, "Marie Cardiff", MembershipStatus.GOLD);
    testMembership.addMember(testMember3);

    const testMember4 = new Member(37, "George Costanza", MembershipStatus.SILVER);
    testMembership.addMember(testMember4);

    const testWorkout1 = new Workout(11, 10, 20);
    const testWorkout2 = new Workout(24, 15, 35);
    const testWorkout3 = new Workout(32, 50, 90);
    const testWorkout4 = new Workout(47, 100, 155);
    const testWorkout5 = new Workout(56, 120, 200);
    const testWorkout6 = new Workout(62, 300, 400);
    const testWorkout7 = new Workout(78, 1000, 1010);
    const testWorkout8 = new Workout(80, 1010, 1045);

    testMembership.addWorkout(12, testWorkout1);
    testMembership.addWorkout(22, testWorkout2);
    testMembership.addWorkout(31, testWorkout3);
    testMembership.addWorkout(12, testWorkout4);
    testMembership.addWorkout(22, testWorkout5);
    testMembership.addWorkout(31, testWorkout6);
    testMembership.addWorkout(12, testWorkout7);
    testMembership.addWorkout(4, testWorkout8);

    const averageDurations = testMembership.getAverageWorkoutDurations();
   
    assert.ok(Math.abs(averageDurations.get(12) - 25.0) < 0.1);
    assert.ok(Math.abs(averageDurations.get(22) - 50.0) < 0.1);
    assert.ok(Math.abs(averageDurations.get(31) - 70.0) < 0.1);
    assert.ok(!averageDurations.has(4));
  },
}


// run all tests
Object.getOwnPropertyNames(testMethods).forEach((func) => {
  try {
    console.log(`Running ${func}`);
    testMethods[func]();
    console.log('OK');
  } catch (e) {
    console.log('FAIL');
    console.log(e);
  }
  console.log('');
});
```

</details>

#### Problems in this snippet

- Paid count checks only SILVER and omits GOLD.
- Workout insertion and per-member average methods are missing.
- The standalone Coding Question 2: text must be removed or commented before running.
- Zero members needs an explicit conversion-rate policy.

#### Corrected answer and explanation

##### I. Gym membership statistics and average workout durations

**Sources:** F8/F9 describe the issue; F16/F17 contain one version; F28 contains another version; F21 references the gym task.

###### Errors and differences

- F16/F17 only count SILVER as paid; GOLD must count too.
- F28 **already checks SILVER or GOLD**, so that fix is not missing there.
- Dividing by zero for an empty gym produces NaN; choose a documented empty conversion rate. This answer uses 0%.
- F16/F17 omit addWorkout/getAverageWorkoutDurations. F28 includes empty placeholders and has no workouts storage.
- A standalone `Coding Question 2:` line outside a comment is invalid source if copied literally.
- Do not use `status !== BRONZE` as the only paid check unless the status domain is validated; unknown values would accidentally count as paid.

###### Corrected complete classes

```js
class MembershipStatus {
  static BRONZE = 1;
  static SILVER = 2;
  static GOLD = 3;
}

class Member {
  constructor(memberId, name, membershipStatus = MembershipStatus.BRONZE) {
    this.memberId = memberId;
    this.name = name;
    this.membershipStatus = membershipStatus;
  }
  isEqual(other) {
    return other instanceof Member && this.memberId === other.memberId &&
      this.name === other.name && this.membershipStatus === other.membershipStatus;
  }
  toString() {
    return `Member ID: ${this.memberId}, Name: ${this.name}, Membership Status: ${this.membershipStatus}`;
  }
}

class Workout {
  constructor(id, startTime, endTime) {
    if (!Number.isFinite(startTime) || !Number.isFinite(endTime) ||
        startTime < 0 || endTime > 1440 || endTime < startTime) {
      throw new RangeError("Invalid same-day workout times");
    }
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }
  getDuration() { return this.endTime - this.startTime; }
}

class Membership {
  constructor(members = []) {
    this.members = [];
    this.memberById = new Map();
    this.workouts = new Map();
    for (const member of members) this.addMember(member);
  }
  addMember(member) {
    if (this.memberById.has(member.memberId)) throw new Error("Duplicate member ID");
    this.members.push(member);
    this.memberById.set(member.memberId, member);
  }
  updateMembership(memberId, status) {
    if (![MembershipStatus.BRONZE, MembershipStatus.SILVER, MembershipStatus.GOLD].includes(status)) {
      throw new Error("Invalid membership status");
    }
    const member = this.memberById.get(memberId);
    if (member) member.membershipStatus = status;
  }
  getMembershipStatistics() {
    const totalMembers = this.members.length;
    const totalPaidMembers = this.members.filter((member) =>
      member.membershipStatus === MembershipStatus.SILVER ||
      member.membershipStatus === MembershipStatus.GOLD
    ).length;
    const conversionRate = totalMembers ? totalPaidMembers / totalMembers * 100 : 0;
    return { totalMembers, totalPaidMembers, conversionRate };
  }
  addWorkout(memberId, workout) {
    if (!this.memberById.has(memberId)) return;
    if (!this.workouts.has(memberId)) this.workouts.set(memberId, []);
    this.workouts.get(memberId).push(workout);
  }
  getAverageWorkoutDurations() {
    const averages = new Map();
    for (const [memberId, workouts] of this.workouts) {
      const total = workouts.reduce((sum, workout) => sum + workout.getDuration(), 0);
      averages.set(memberId, total / workouts.length);
    }
    return averages;
  }
}
```

**Explanation:** Store workouts by member ID. Ignore unknown members as requested. Average each member's own sessions; do not divide by total members. Members without sessions are omitted from the returned Map, a policy consistent with the supplied checks. Input workout IDs are assumed unique as stated; repeated-submission policy is unspecified.

F16/F17 expected averages: ID12=25, ID22=50, ID31=70. F28 changes one session from 40 to 45 minutes, so ID31 is **72.5**, not 70. Unknown member ID4 must be absent. The fifth/sixth member variations change paid conversion from 60% to about 66.67%; do not hardcode either answer. Statistics O(M), workout insertion average O(1), averages O(W), storage O(M+W).

## Javascript - BE!F17

### Question 1 in this cell

Fix paid gym membership counts and implement addWorkout and getAverageWorkoutDurations.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```js
"use strict";
/*
We are building a program to manage a gym's membership. The gym has multiple members, each with a unique ID, name, and membership status. The program allows gym staff to add new members, update members status, and get membership statistics.

Definitions:
* A "member" is an object that represents a gym member. It has properties for the ID, name, and membership status.
* A "membership" is a class which is used for managing members in the gym.

Coding Question 1:
To begin with, we present you with two tasks:
1-1) Read through and understand the code below. Please take as much time as necessary, and feel free to run the code.
1-2) The test for Membership is not passing due to a bug in the code. Make the necessary changes to Membership to fix the bug.
*/

// REVIEW ERROR: This copied question label is outside a comment and is not valid code.
Coding Question 2:
/*
We are currently updating our system to include information about workouts for our members. As part of this update, we have introduced the Workout class, which represents a single workout session for a member. Each object of the Workout class has a unique ID, as well as a start time and end time that are represented in the number of minutes spent from the start of the day. You can assume that all the Workouts are from the same day.

To implement these changes, we need to add two functions to the Membership class:

2.1) The `addWorkout` function should be used to add a workout session for a member. If the given member does not exist while calling this function, the workout can be ignored.

2.2) The `getAverageWorkoutDurations` function should calculate the average duration of workouts for each member in minutes and return the results as a map.

To assist you in testing these new functions, we have provided the testGetAverageWorkoutDurations function.
*/

const assert = require("assert");

class MembershipStatus {
  /*
  Membership Status is of three types: BRONZE, SILVER and GOLD.
  BRONZE is the default membership a new member gets.
  SILVER and GOLD are paid memberships for the gym.
  */
  static BRONZE = 1;
  static SILVER = 2;
  static GOLD = 3;
}

class Member {
  /* Data about a gym member. */
    constructor(memberId, name, membershipStatus) {
    this.memberId = memberId;
    this.name = name;
    this.membershipStatus = membershipStatus;
  }

  isEqual(other) {
    if (!(other instanceof Member)) {
      return false;
    }
    return (
      this.memberId === other.memberId &&
      this.name === other.name &&
      this.membershipStatus === other.membershipStatus
    );
  }

  toString() {
    return `Member ID: ${this.memberId}, Name: ${this.name}, Membership Status: ${this.membershipStatus}`;
  }
}

class Membership {
  /*
  Data for managing a gym membership, and methods which staff can
  use to perform any queries or updates.
  */
    constructor(members = []) {
    this.members = members;
    this.workouts = new Map();
  }

  addMember(member) {
    /* Adds a member to the gym */
    this.members.push(member);
  }

  updateMembership(memberId, membershipStatus) {
    /* Update membership of the given member */
    for (const member of this.members) {
      if (member.memberId === memberId) {
        member.membershipStatus = membershipStatus;
        break;
      }
    }
  }
  
  getMembershipStatistics() {
    /* Calculates and returns membership statistics for all members */
    const totalMembers = this.members.length;
    const totalPaidMembers = this.members.filter(
      (member) =>
        // REVIEW ERROR: GOLD members are also paid; include both statuses.
        member.membershipStatus === MembershipStatus.SILVER
    ).length;
    // REVIEW CHECK: For zero members, this divides 0 by 0; define the empty result.
    const conversionRate = (totalPaidMembers / totalMembers) * 100;

    return {
      totalMembers,
      totalPaidMembers,
      conversionRate,
    };
  }
}

class Workout {
  /*
  This class represents a single workout session for a member.
  Each object of the Workout class has a unique ID, as well as 
  a start time and end time that are represented in the number 
  of minutes spent from the start of the day.
  */
  constructor(id, startTime, endTime) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }
  

  getDuration() {
    return this.endTime - this.startTime;
  }
}

const testMethods = {
    testMember: () => {
    const testMember = new Member(1, "John Doe", MembershipStatus.BRONZE);
    assert.strictEqual(testMember.memberId, 1);
    assert.strictEqual(testMember.name, "John Doe");
    assert.strictEqual(testMember.membershipStatus, MembershipStatus.BRONZE);
  },
  testMembership: () => {
    const testMembership = new Membership();
    const testMember = new Member(1, "John Doe", MembershipStatus.BRONZE);
    testMembership.addMember(testMember);
    assert.strictEqual(testMembership.members.length, 1);
    assert.ok(testMembership.members[0].isEqual(testMember));

    testMembership.updateMembership(1, MembershipStatus.SILVER);
    assert.strictEqual(
      testMembership.members[0].membershipStatus,
      MembershipStatus.SILVER
    );

    const testMember2 = new Member(2, "Alex C", MembershipStatus.BRONZE);
    testMembership.addMember(testMember2);

    const testMember3 = new Member(3, "Marie C", MembershipStatus.GOLD);
    testMembership.addMember(testMember3);

    const testMember4 = new Member(4, "Joe D", MembershipStatus.SILVER);
    testMembership.addMember(testMember4);

    const testMember5 = new Member(5, "June R", MembershipStatus.BRONZE);
    testMembership.addMember(testMember5);

    const attendanceStats = testMembership.getMembershipStatistics();
    assert.strictEqual(attendanceStats.totalMembers, 5);
    assert.strictEqual(attendanceStats.totalPaidMembers, 3);
    assert.ok(Math.abs(attendanceStats.conversionRate - 60.00) < 0.1);
  },
  
    // REVIEW MISSING: The class does not implement the two workout methods used by this test.
    testGetAverageWorkoutDurations() {
    const testMembership = new Membership();
    const testMember = new Member(12, "John Doe", MembershipStatus.SILVER);
    testMembership.addMember(testMember);

    const testMember2 = new Member(22, "Alex Cleeve", MembershipStatus.BRONZE);
    testMembership.addMember(testMember2);

    const testMember3 = new Member(31, "Marie Cardiff", MembershipStatus.GOLD);
    testMembership.addMember(testMember3);

    const testMember4 = new Member(37, "George Costanza", MembershipStatus.SILVER);
    testMembership.addMember(testMember4);

    const testWorkout1 = new Workout(11, 10, 20);
    const testWorkout2 = new Workout(24, 15, 35);
    const testWorkout3 = new Workout(32, 50, 90);
    const testWorkout4 = new Workout(47, 100, 155);
    const testWorkout5 = new Workout(56, 120, 200);
    const testWorkout6 = new Workout(62, 300, 400);
    const testWorkout7 = new Workout(78, 1000, 1010);
    const testWorkout8 = new Workout(80, 1010, 1045);

    testMembership.addWorkout(12, testWorkout1);
    testMembership.addWorkout(22, testWorkout2);
    testMembership.addWorkout(31, testWorkout3);
    testMembership.addWorkout(12, testWorkout4);
    testMembership.addWorkout(22, testWorkout5);
    testMembership.addWorkout(31, testWorkout6);
    testMembership.addWorkout(12, testWorkout7);
    testMembership.addWorkout(4, testWorkout8);

    const averageDurations = testMembership.getAverageWorkoutDurations();
   
    assert.ok(Math.abs(averageDurations.get(12) - 25.0) < 0.1);
    assert.ok(Math.abs(averageDurations.get(22) - 50.0) < 0.1);
    assert.ok(Math.abs(averageDurations.get(31) - 70.0) < 0.1);
    assert.ok(!averageDurations.has(4));
  },
}


// run all tests
Object.getOwnPropertyNames(testMethods).forEach((func) => {
  try {
    console.log(`Running ${func}`);
    testMethods[func]();
    console.log('OK');
  } catch (e) {
    console.log('FAIL');
    console.log(e);
  }
  console.log('');
});
```

</details>

#### Problems in this snippet

- Same supplied implementation as F16: SILVER-only count, missing workout methods and copied prose outside comments.

#### Corrected answer and explanation

##### I. Gym membership statistics and average workout durations

**Sources:** F8/F9 describe the issue; F16/F17 contain one version; F28 contains another version; F21 references the gym task.

###### Errors and differences

- F16/F17 only count SILVER as paid; GOLD must count too.
- F28 **already checks SILVER or GOLD**, so that fix is not missing there.
- Dividing by zero for an empty gym produces NaN; choose a documented empty conversion rate. This answer uses 0%.
- F16/F17 omit addWorkout/getAverageWorkoutDurations. F28 includes empty placeholders and has no workouts storage.
- A standalone `Coding Question 2:` line outside a comment is invalid source if copied literally.
- Do not use `status !== BRONZE` as the only paid check unless the status domain is validated; unknown values would accidentally count as paid.

###### Corrected complete classes

```js
class MembershipStatus {
  static BRONZE = 1;
  static SILVER = 2;
  static GOLD = 3;
}

class Member {
  constructor(memberId, name, membershipStatus = MembershipStatus.BRONZE) {
    this.memberId = memberId;
    this.name = name;
    this.membershipStatus = membershipStatus;
  }
  isEqual(other) {
    return other instanceof Member && this.memberId === other.memberId &&
      this.name === other.name && this.membershipStatus === other.membershipStatus;
  }
  toString() {
    return `Member ID: ${this.memberId}, Name: ${this.name}, Membership Status: ${this.membershipStatus}`;
  }
}

class Workout {
  constructor(id, startTime, endTime) {
    if (!Number.isFinite(startTime) || !Number.isFinite(endTime) ||
        startTime < 0 || endTime > 1440 || endTime < startTime) {
      throw new RangeError("Invalid same-day workout times");
    }
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }
  getDuration() { return this.endTime - this.startTime; }
}

class Membership {
  constructor(members = []) {
    this.members = [];
    this.memberById = new Map();
    this.workouts = new Map();
    for (const member of members) this.addMember(member);
  }
  addMember(member) {
    if (this.memberById.has(member.memberId)) throw new Error("Duplicate member ID");
    this.members.push(member);
    this.memberById.set(member.memberId, member);
  }
  updateMembership(memberId, status) {
    if (![MembershipStatus.BRONZE, MembershipStatus.SILVER, MembershipStatus.GOLD].includes(status)) {
      throw new Error("Invalid membership status");
    }
    const member = this.memberById.get(memberId);
    if (member) member.membershipStatus = status;
  }
  getMembershipStatistics() {
    const totalMembers = this.members.length;
    const totalPaidMembers = this.members.filter((member) =>
      member.membershipStatus === MembershipStatus.SILVER ||
      member.membershipStatus === MembershipStatus.GOLD
    ).length;
    const conversionRate = totalMembers ? totalPaidMembers / totalMembers * 100 : 0;
    return { totalMembers, totalPaidMembers, conversionRate };
  }
  addWorkout(memberId, workout) {
    if (!this.memberById.has(memberId)) return;
    if (!this.workouts.has(memberId)) this.workouts.set(memberId, []);
    this.workouts.get(memberId).push(workout);
  }
  getAverageWorkoutDurations() {
    const averages = new Map();
    for (const [memberId, workouts] of this.workouts) {
      const total = workouts.reduce((sum, workout) => sum + workout.getDuration(), 0);
      averages.set(memberId, total / workouts.length);
    }
    return averages;
  }
}
```

**Explanation:** Store workouts by member ID. Ignore unknown members as requested. Average each member's own sessions; do not divide by total members. Members without sessions are omitted from the returned Map, a policy consistent with the supplied checks. Input workout IDs are assumed unique as stated; repeated-submission policy is unspecified.

F16/F17 expected averages: ID12=25, ID22=50, ID31=70. F28 changes one session from 40 to 45 minutes, so ID31 is **72.5**, not 70. Unknown member ID4 must be absent. The fifth/sixth member variations change paid conversion from 60% to about 66.67%; do not hardcode either answer. Statistics O(M), workout insertion average O(1), averages O(W), storage O(M+W).

## Javascript - BE!F18

### Question 1 in this cell

Fix failing StockCollection statistics tests and, where requested, implement getBiggestChange with the associated dates.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Same Question as Stock market above but he's shared his experience below

There were two rounds, debugging and coding.
1. Debugging
     - code is provided, there are three questions 1 after 1.
           - Explain the code as it is, what it does, no need to explain any issues you find here. Explain in detail and use functions and variables name, so that they don't get confused, they can't   assume anything you say, you have to say it explicitly.
           - What changes you will suggest for making it more readable and manageable, may be we can suggest the issues here.
           - Provided a value for which the code is failing, we have to find why and explain how to solve it.
2. Coding
     - code is provided, got the same question from the excel, while preparing from sheet, focus on minute details, the sheet doesn't provide the exact question they provide.
              - First question, one provided test case if failing, solve it first.
              - Second the give a scenario to implement, for which we have to explain the steps we are going to take to implement it, and then we can start working on it 
              - you can use google to search, but first you have to let them know what you searching, and then they give approval, no limit to search.

Imp - Karat studio has autocomplete, so it's much helpful, if you have used VS before AI, you would know it. The question I received for live coding was for stock trading data management software, available in sheet.
```

</details>

#### Problems in this snippet

- No new code is included; use the stock solution. The interview instructions in this report are source narrative, not additional task requirements.

#### Corrected answer and explanation

##### E. StockCollection: empty statistics and biggest change

**Sources:** F10, F13, F14, F18, F19; referenced in F20.

###### What fails?

In F10/F13/F19:

```js
Math.max(...[]) // -Infinity, but tests expect null
Math.min(...[]) // Infinity, but tests expect null
0 / 0          // NaN, but tests expect null
```

Add empty-array guards. F14 **already has these guards**; do not claim they are still missing there. Its line `const getBiggestChange = function()` is syntactically incomplete and is outside the class. The test calls an instance method, so implement it inside StockCollection and remove that dangling declaration.

The biggest change is the largest **absolute magnitude**, but the returned value retains its sign. Otherwise the provided `-30` test would fail. Consecutive means consecutive available records in date order, not necessarily adjacent calendar days.

###### Corrected complete classes

```js
class Stock {
  constructor(symbol, name) {
    this.symbol = symbol;
    this.name = name;
  }
  isEqual(other) {
    return other instanceof Stock &&
      this.symbol === other.symbol && this.name === other.name;
  }
}

class PriceRecord {
  constructor(stock, price, date) {
    this.stock = stock;
    this.price = price;
    this.date = date;
  }
  isEqual(other) {
    return other instanceof PriceRecord && this.stock.isEqual(other.stock) &&
      this.price === other.price && this.date === other.date;
  }
}

class StockCollection {
  constructor(stock) {
    this.stock = stock;
    this.priceRecords = [];
  }
  getNumPriceRecords() {
    return this.priceRecords.length;
  }
  addPriceRecord(record) {
    if (!record.stock.isEqual(this.stock)) throw new Error("Stock mismatch");
    if (!Number.isFinite(record.price)) throw new TypeError("Invalid price");
    this.priceRecords.push(record);
  }
  getMaxPrice() {
    if (!this.priceRecords.length) return null;
    return this.priceRecords.reduce((maximum, record) =>
      Math.max(maximum, record.price), -Infinity);
  }
  getMinPrice() {
    if (!this.priceRecords.length) return null;
    return this.priceRecords.reduce((minimum, record) =>
      Math.min(minimum, record.price), Infinity);
  }
  getAvgPrice() {
    if (!this.priceRecords.length) return null;
    const total = this.priceRecords.reduce((sum, record) => sum + record.price, 0);
    return total / this.priceRecords.length;
  }
  getBiggestChange() {
    if (this.priceRecords.length < 2) return null;
    // Assumes valid ISO dates and one record per date, as in the test data.
    const sorted = [...this.priceRecords].sort((a, b) => a.date.localeCompare(b.date));
    let result = null;
    for (let i = 1; i < sorted.length; i++) {
      const previous = sorted[i - 1];
      const current = sorted[i];
      const change = current.price - previous.price;
      if (result === null || Math.abs(change) > Math.abs(result[0])) {
        result = [change, previous.date, current.date];
      }
    }
    return result;
  }
}
```

**Explanation:** Empty statistics return the exact contract's null. Copy before sorting to preserve insertion order. Compare absolute changes, return the signed difference and both dates. For ties, this code keeps the earliest pair in chronological order; clarify that policy and duplicate-date behavior if needed. Statistics are O(R), biggest change O(R log R), with O(R) sorting space.

**Expected answers:** `[110,112,90,105]` gives max 112, min 90, average 104.25. Sorted dates in the first change test give `[20,"2023-06-25","2023-06-29"]`. The second test gives `[-30,"1999-12-30","2000-01-01"]`.

## Javascript - BE!F19

### Question 1 in this cell

Fix failing StockCollection statistics tests and, where requested, implement getBiggestChange with the associated dates.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```js
"use strict";
/*
We are developing a stock trading data management software that tracks the prices of different stocks over time and provides useful statistics.

The program includes three classes: `Stock`, `PriceRecord`, and `StockCollection`.

Classes:
* The `Stock` class represents data about a specific stock.
* The `PriceRecord` class holds information about a single price record for a stock.
* The `StockCollection` class manages a collection of price records for a particular stock and provides methods to retrieve useful statistics about the stock's prices.

To begin with, we present you with two tasks:
1-1) Read through and understand the code below. Please take as much time as necessary, and feel free to run the code.
1-2) The test for StockCollection is not passing due to a bug in the code. Make the necessary changes to StockCollection to fix the bug.
*/
/*
2) We want to add a new function called "getBiggestChange" to the StockCollection class. This function calculates and returns the largest change in stock price between any two consecutive days in the price records of a stock along with the dates of the change in a list. For example, let's consider the following price records of a stock:

Price Records:
Price:  110         112         90          105
Date:   2023-06-29  2023-07-01  2023-06-25  2023-07-06

Stock price changes (sorted based on date):
Date:     2023-06-25  ->  2023-06-29  ->  2023-07-01 ->  2023-07-06
Price:        90      ->      110     ->     112     ->     105
Change:              +20              +2             -7

In this case, the biggest change in the stock price was +20, which occurred between 2023-06-25 and 2023-06-29. In this case, the function should return [20, "2023-06-25", "2023-06-29"]

Two days are considered consecutive if there are no other days' data in between them in the price records based on their dates.

To assist you in testing this new function, we have provided the testGetBiggestChange function.
*/
const assert = require("assert");

class Stock {
  /* Data about a particular stock. */
  constructor(symbol, name) {
    this.symbol = symbol; // String, the symbol of the stock
    this.name = name; // String, the name of the stock
  }

  isEqual(other) {
    if (!(other instanceof this.constructor)) return false;
    return this.symbol === other.symbol && this.name === other.name;
  }
}

class PriceRecord {
  /* Data and methods about a single price record of a stock. */
  constructor(stock, price, date) {
    this.stock = stock; // a Stock object representing the stock
    this.price = price; // int, the price of the stock
    this.date = date; // str, the date of the price record is of the format "YYYY-MM-DD"
  }

  isEqual(other) {
    if (!(other instanceof this.constructor)) return false;
    return this.stock.isEqual(other.stock) && this.price === other.price && this.date === other.date;
  }
}

class StockCollection {
  /*
   * Data for a collection of price records for a particular stock, and methods for getting
   * useful statistics about the stock's prices.
   */
  constructor(stock) {
    this.priceRecords = []; // list of PriceRecord objects, the price records for this particular stock
    this.stock = stock; // stock, the Stock this StockCollection is for
  }

  getNumPriceRecords() {
    /* Returns the number of PriceRecords in this StockCollection */
    return this.priceRecords.length;
  }

  addPriceRecord(priceRecord) {
    /* Adds a PriceRecord to this StockCollection. */
    if (!priceRecord.stock.isEqual(this.stock)) {
      throw new Error("PriceRecord's Stock is not the same as the StockCollection's");
    }
    this.priceRecords.push(priceRecord);
  }

  getMaxPrice() {
    /* Return the maximum price recorded in this StockCollection. */
    // REVIEW ERROR: An empty collection returns -Infinity; tests require null.
    return Math.max(...this.priceRecords.map((priceRecord) => priceRecord.price));
  }

  getMinPrice() {
    /* Return the minimum price recorded in this StockCollection. */
    // REVIEW ERROR: An empty collection returns Infinity; tests require null.
    return Math.min(...this.priceRecords.map((priceRecord) => priceRecord.price));
  }

  getAvgPrice() {
    /* Return the average price recorded in this StockCollection. */
    const total = this.priceRecords.reduce((acc, priceRecord) => acc + priceRecord.price, 0);
    // REVIEW ERROR: Empty length causes 0/0 (NaN); tests require null.
    return total / this.priceRecords.length;
  }
}

const makeStockCollection = function (stock, priceData) {
  // Create a new StockCollection for test purposes.
  const stockCollection = new StockCollection(stock);
  for (const [price, date] of priceData) {
    const priceRecord = new PriceRecord(stock, price, date);
    stockCollection.addPriceRecord(priceRecord);
  }
  return stockCollection;
};

const testMethods = {
  testPriceRecord: () => {
    /* Test basic PriceRecord functionality */
    const testStock = new Stock("AAPL", "Apple Inc.");
    const testPriceRecord = new PriceRecord(testStock, 100, "2023-07-01");
    assert.strictEqual(testPriceRecord.stock, testStock);
    assert.strictEqual(testPriceRecord.price, 100);
    assert.strictEqual(testPriceRecord.date, "2023-07-01");
  },
  testStockCollection: () => {
    /* Test basic StockCollection functionality */
    const testStock = new Stock("AAPL", "Apple Inc.");
    const stockCollection = new StockCollection(testStock);
    assert.strictEqual(stockCollection.getNumPriceRecords(), 0);
    assert.strictEqual(stockCollection.getMaxPrice(), null);
    assert.strictEqual(stockCollection.getMinPrice(), null);
    assert.strictEqual(stockCollection.getAvgPrice(), null);

    /* Price Records:
     * Price:  110         112         90          105
     * Date:   2023-06-29  2023-07-01  2023-06-28  2023-07-06
     */
    const priceData = [
      [110, "2023-06-29"],
      [112, "2023-07-01"],
      [90, "2023-06-28"],
      [105, "2023-07-06"],
    ];
    const testStock2 = new Stock("AAPL", "Apple Inc.");
    const stockCollection2 = makeStockCollection(testStock2, priceData);
    assert.strictEqual(stockCollection2.getNumPriceRecords(), priceData.length);
    assert.strictEqual(stockCollection2.getMaxPrice(), 112);
    assert.strictEqual(stockCollection2.getMinPrice(), 90);
    assert.ok(Math.abs(stockCollection2.getAvgPrice() - 104.25) < 0.1);
  },
  // REVIEW MISSING: The tests call getBiggestChange, but the class has no such method.
  testGetBiggestChange: () => {
    /* Test the getBiggestChange method */
    const testStock = new Stock("AAPL", "Apple Inc.");
    const stockCollection = new StockCollection(testStock);
    assert.strictEqual(stockCollection.getBiggestChange(), null);

    /* Price Records:
     * Price:  110         112         90          105
     * Date:   2023-06-29  2023-07-01  2023-06-25  2023-07-06
     */
    const priceData = [
      [110, "2023-06-29"],
      [112, "2023-07-01"],
      [90, "2023-06-25"],
      [105, "2023-07-06"],
    ];
    const stockCollection2 = makeStockCollection(testStock, priceData);
    assert.deepStrictEqual(stockCollection2.getBiggestChange(), [20, "2023-06-25", "2023-06-29"]);

    /* Price Records:
     * Price:  200         210         190          180
     * Date:   2000-01-04  1999-12-30  2000-01-03  2000-01-01
     */
    const priceData2 = [
      [200, "2000-01-04"],
      [210, "1999-12-30"],
      [190, "2000-01-03"],
      [180, "2000-01-01"],
    ];
    const stockCollection3 = makeStockCollection(testStock, priceData2);
    assert.deepStrictEqual(stockCollection3.getBiggestChange(), [-30, "1999-12-30", "2000-01-01"]);
  },
}

// run all tests
Object.getOwnPropertyNames(testMethods).forEach((func) => {
  try {
    console.log(`Running ${func}`);
    testMethods[func]();
    console.log('OK');
  } catch (e) {
    console.log('FAIL');
    console.log(e);
  }
  console.log('');
});
```

</details>

#### Problems in this snippet

- Empty statistics lack null guards and getBiggestChange is not implemented.
- Keep the negative sign when a price drop has the largest absolute change.

#### Corrected answer and explanation

##### E. StockCollection: empty statistics and biggest change

**Sources:** F10, F13, F14, F18, F19; referenced in F20.

###### What fails?

In F10/F13/F19:

```js
Math.max(...[]) // -Infinity, but tests expect null
Math.min(...[]) // Infinity, but tests expect null
0 / 0          // NaN, but tests expect null
```

Add empty-array guards. F14 **already has these guards**; do not claim they are still missing there. Its line `const getBiggestChange = function()` is syntactically incomplete and is outside the class. The test calls an instance method, so implement it inside StockCollection and remove that dangling declaration.

The biggest change is the largest **absolute magnitude**, but the returned value retains its sign. Otherwise the provided `-30` test would fail. Consecutive means consecutive available records in date order, not necessarily adjacent calendar days.

###### Corrected complete classes

```js
class Stock {
  constructor(symbol, name) {
    this.symbol = symbol;
    this.name = name;
  }
  isEqual(other) {
    return other instanceof Stock &&
      this.symbol === other.symbol && this.name === other.name;
  }
}

class PriceRecord {
  constructor(stock, price, date) {
    this.stock = stock;
    this.price = price;
    this.date = date;
  }
  isEqual(other) {
    return other instanceof PriceRecord && this.stock.isEqual(other.stock) &&
      this.price === other.price && this.date === other.date;
  }
}

class StockCollection {
  constructor(stock) {
    this.stock = stock;
    this.priceRecords = [];
  }
  getNumPriceRecords() {
    return this.priceRecords.length;
  }
  addPriceRecord(record) {
    if (!record.stock.isEqual(this.stock)) throw new Error("Stock mismatch");
    if (!Number.isFinite(record.price)) throw new TypeError("Invalid price");
    this.priceRecords.push(record);
  }
  getMaxPrice() {
    if (!this.priceRecords.length) return null;
    return this.priceRecords.reduce((maximum, record) =>
      Math.max(maximum, record.price), -Infinity);
  }
  getMinPrice() {
    if (!this.priceRecords.length) return null;
    return this.priceRecords.reduce((minimum, record) =>
      Math.min(minimum, record.price), Infinity);
  }
  getAvgPrice() {
    if (!this.priceRecords.length) return null;
    const total = this.priceRecords.reduce((sum, record) => sum + record.price, 0);
    return total / this.priceRecords.length;
  }
  getBiggestChange() {
    if (this.priceRecords.length < 2) return null;
    // Assumes valid ISO dates and one record per date, as in the test data.
    const sorted = [...this.priceRecords].sort((a, b) => a.date.localeCompare(b.date));
    let result = null;
    for (let i = 1; i < sorted.length; i++) {
      const previous = sorted[i - 1];
      const current = sorted[i];
      const change = current.price - previous.price;
      if (result === null || Math.abs(change) > Math.abs(result[0])) {
        result = [change, previous.date, current.date];
      }
    }
    return result;
  }
}
```

**Explanation:** Empty statistics return the exact contract's null. Copy before sorting to preserve insertion order. Compare absolute changes, return the signed difference and both dates. For ties, this code keeps the earliest pair in chronological order; clarify that policy and duplicate-date behavior if needed. Statistics are O(R), biggest change O(R log R), with O(R) sorting space.

**Expected answers:** `[110,112,90,105]` gives max 112, min 90, average 104.25. Sorted dates in the first change test give `[20,"2023-06-25","2023-06-29"]`. The second test gives `[-30,"1999-12-30","2000-01-01"]`.

## Javascript - BE!F20

### Question 1 in this cell

This cell contains a reference, interview account, or missing/corrupted question rather than a complete supplied code snippet.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Combination of row 2 and 10.
```

</details>

#### Problems in this snippet

- The cell only says Combination of row 2 and 10. It contains no code, and the report numbering is ambiguous.
- Do not invent an exact snippet for this reference; the likely admin/stock topics are available as separate answers.

#### Corrected answer and explanation

##### L. Missing questions, broken references and copying errors

- **F2:** “Same Questions as the below one.F2+F2” is a broken/self-referential note, not a code snippet. The following row's questions are covered, but the exact intended reference cannot be established.
- **F6:** “Retrieving data. Wait a few seconds...” is a spreadsheet copying error, not a question or JavaScript exception.
- **F18:** Refers to the stock task and describes the interview process; it supplies no new code.
- **F20:** “Combination of row 2 and 10” does not reliably identify which numbering convention was used. It adds no implementation; see the linked admin/stock answers without treating the reference as proof of exact source.
- **F21:** Refers to the MySQL/string task and gym task; see H and I.
- **F24:** Mentions Node streaming/database discussion and a corporate-security coding puzzle but omits the snippets and actual puzzle requirements. A complete exact solution cannot be produced from that description. General review areas include backpressure, avoiding unnecessary buffering, error propagation, releasing resources, parameterized database access and trusted authorization. These are investigation points, not demonstrated defects in unseen code. Node's HTTP request/response model is documented in the [official API reference](https://nodejs.org/api/http.html).
- **F25/F28 database-string review:** The database query itself is not included. Evaluate repeated reads, pooling, selecting only required columns, input validation and parameter binding once the actual query is available; do not claim proven injection or hardcoded credentials without evidence.

##### Verification

The corrected stock classes passed the original tests extracted from F10, F13, F14 and F19. The corrected gym classes passed the original tests from F16, F17 and F28, including their different average durations. All corrected JavaScript implementation blocks were parsed. Additional checks passed for whitespace/numeric log parsing, completed journeys, one-ticket-per-journey speeding, repeated speeding journeys, all seven original teleporter cases, string reversal, duplicate IDs, empty/negative transaction maxima, grouped todos, profile validation, final connection counts, and mocked handler authorization/method/input handling.

The DOM applications, live HTTP endpoints, and real MySQL connections were not integration-tested. Workbook tollbooth fixture files under /content/test are absent; their expected totals were not rerun. Examples marked as reconstructions depend on the documented assumptions and injected services. The workbook itself was not edited.

The reference is ambiguous. The available admin-handler and stock examples are supplied below as possible related answers, not as a reconstruction of this missing snippet.

##### A. Unique user IDs and highest transactions for an admin

**Sources:** F3, F8, F9, F26, F27; related references in F20.

**Question:** Explain an HTTP endpoint that deduplicates user IDs, reads transactions, returns the maximum amount for each user, and permits only admins. Improve readability, find the duplicate-ID bug, and propose tests.

###### What is actually wrong?

The implementation of `get`, `get2`, and `httpsServerHandler` is **not copied into the workbook**. F8/F9 report the concrete bug: the loop uses `i < a.length - 1`, so the final input is never examined. With `['a','b','a','b','c']`, the unique `c` is lost.

```js
// Wrong bound reported in the interview:
for (let i = 0; i < userIds.length - 1; i++) { /* ... */ }

// Correct bound:
for (let i = 0; i < userIds.length; i++) { /* ... */ }

// Simpler deduplication:
const uniqueUserIds = [...new Set(userIds)];
```

**Other issues to investigate, not invent:** The reports put `role` in `req.body`. A client-supplied role cannot establish authorization. Use identity/roles established by trusted authentication middleware. Raw Node HTTP requests do not automatically have a parsed `req.body`; an Express-style example must explicitly assume JSON middleware. Check input validation, error propagation, repeated database queries and response completion.

Initializing a maximum at `-1` is valid only under an explicitly nonnegative-amount/sentinel contract. This answer uses `null` for no transactions and also supports negative values. Never use `Math.max(...[])` without an empty case.

###### Corrected reference implementation

This is an **Express-style handler factory**. It assumes a trusted authentication middleware has set `req.user` and JSON middleware has parsed `req.body`. `getMaxByUserIds` is an injected repository method returning `{userId, maxAmount}` rows; the original schema and framework are not supplied.

```js
function uniqueIds(userIds) {
  if (!Array.isArray(userIds) || userIds.length > 1000) {
    throw new TypeError("userIds must be an array of at most 1000 IDs");
  }
  if (userIds.some((id) => typeof id !== "string" || !id.trim())) {
    throw new TypeError("Every user ID must be a nonempty string");
  }
  return [...new Set(userIds)];
}

function highestAmount(transactions) {
  if (transactions.length === 0) return null;
  let maximum = -Infinity;
  for (const transaction of transactions) {
    if (!Number.isFinite(transaction.amount)) {
      throw new TypeError("Transaction amounts must be finite numbers");
    }
    maximum = Math.max(maximum, transaction.amount);
  }
  return maximum;
}

function makeHighestTransactionsHandler(getMaxByUserIds) {
  return async function highestTransactionsHandler(req, res) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }
    if (!req.user) return res.status(401).json({ error: "Authentication required" });
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    let ids;
    try {
      ids = uniqueIds(req.body?.userIds);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    if (ids.length === 0) return res.status(200).json([]);

    try {
      const rows = await getMaxByUserIds(ids);
      const amounts = new Map(rows.map((row) => [row.userId, row.maxAmount]));
      return res.status(200).json(ids.map((userId) => ({
        userId,
        highestTransaction: amounts.get(userId) ?? null,
      })));
    } catch {
      return res.status(500).json({ error: "Unable to read transactions" });
    }
  };
}
```

**Database improvement:** If the schema supports it, use one parameterized aggregate query rather than reading every transaction per user. Example schema only:

```sql
SELECT user_id AS userId, MAX(amount) AS maxAmount
FROM transactions
WHERE user_id IN (?, ?, ?)
GROUP BY user_id;
```

Generate the placeholder count from the validated ID count and bind the ID values; do not concatenate input values into SQL. The schema, tenant constraints and driver decimal representation must match the real application. Do not assume database DECIMAL values are always JavaScript numbers. Prepared placeholders and promise-based access are documented by [MySQL2](https://sidorares.github.io/node-mysql2/docs).

**Tests:** empty IDs, all duplicates, unique final ID, one ID, invalid IDs, non-admin, unauthenticated, incorrect method, database failure, no transactions, zero amount and negative amounts if allowed. Verify `role: "ADMIN"` in the body cannot override a non-admin authenticated user.

**Explanation:** Deduplicate before database access. Separate validation, authorization, querying and response formatting. Database aggregation reduces transferred data and can avoid N+1 queries. `405` is the usual response for a recognized route with the wrong method; the reported original uses `404`, which should be checked against its intended contract rather than treated as a syntax error.

##### E. StockCollection: empty statistics and biggest change

**Sources:** F10, F13, F14, F18, F19; referenced in F20.

###### What fails?

In F10/F13/F19:

```js
Math.max(...[]) // -Infinity, but tests expect null
Math.min(...[]) // Infinity, but tests expect null
0 / 0          // NaN, but tests expect null
```

Add empty-array guards. F14 **already has these guards**; do not claim they are still missing there. Its line `const getBiggestChange = function()` is syntactically incomplete and is outside the class. The test calls an instance method, so implement it inside StockCollection and remove that dangling declaration.

The biggest change is the largest **absolute magnitude**, but the returned value retains its sign. Otherwise the provided `-30` test would fail. Consecutive means consecutive available records in date order, not necessarily adjacent calendar days.

###### Corrected complete classes

```js
class Stock {
  constructor(symbol, name) {
    this.symbol = symbol;
    this.name = name;
  }
  isEqual(other) {
    return other instanceof Stock &&
      this.symbol === other.symbol && this.name === other.name;
  }
}

class PriceRecord {
  constructor(stock, price, date) {
    this.stock = stock;
    this.price = price;
    this.date = date;
  }
  isEqual(other) {
    return other instanceof PriceRecord && this.stock.isEqual(other.stock) &&
      this.price === other.price && this.date === other.date;
  }
}

class StockCollection {
  constructor(stock) {
    this.stock = stock;
    this.priceRecords = [];
  }
  getNumPriceRecords() {
    return this.priceRecords.length;
  }
  addPriceRecord(record) {
    if (!record.stock.isEqual(this.stock)) throw new Error("Stock mismatch");
    if (!Number.isFinite(record.price)) throw new TypeError("Invalid price");
    this.priceRecords.push(record);
  }
  getMaxPrice() {
    if (!this.priceRecords.length) return null;
    return this.priceRecords.reduce((maximum, record) =>
      Math.max(maximum, record.price), -Infinity);
  }
  getMinPrice() {
    if (!this.priceRecords.length) return null;
    return this.priceRecords.reduce((minimum, record) =>
      Math.min(minimum, record.price), Infinity);
  }
  getAvgPrice() {
    if (!this.priceRecords.length) return null;
    const total = this.priceRecords.reduce((sum, record) => sum + record.price, 0);
    return total / this.priceRecords.length;
  }
  getBiggestChange() {
    if (this.priceRecords.length < 2) return null;
    // Assumes valid ISO dates and one record per date, as in the test data.
    const sorted = [...this.priceRecords].sort((a, b) => a.date.localeCompare(b.date));
    let result = null;
    for (let i = 1; i < sorted.length; i++) {
      const previous = sorted[i - 1];
      const current = sorted[i];
      const change = current.price - previous.price;
      if (result === null || Math.abs(change) > Math.abs(result[0])) {
        result = [change, previous.date, current.date];
      }
    }
    return result;
  }
}
```

**Explanation:** Empty statistics return the exact contract's null. Copy before sorting to preserve insertion order. Compare absolute changes, return the signed difference and both dates. For ties, this code keeps the earliest pair in chronological order; clarify that policy and duplicate-date behavior if needed. Statistics are O(R), biggest change O(R log R), with O(R) sorting space.

**Expected answers:** `[110,112,90,105]` gives max 112, min 90, average 104.25. Sorted dates in the first change test give `[20,"2023-06-25","2023-06-29"]`. The second test gives `[-30,"1999-12-30","2000-01-01"]`.

## Javascript - BE!F21

### Question 1 in this cell

Debug the MySQL/string-processing code, correct reverseWord, improve readability/data access, and explain test cases.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
First question, same as 15.
Second question, same as 16 - gym membership.
```

</details>

#### Problems in this snippet

- This cell refers to the MySQL/string question rather than repeating its code.
- The actual F15 reversal bug is an out-of-bounds starting index: word.length instead of word.length - 1.

#### Corrected answer and explanation

##### H. MySQL access, reverseWord and reverseSentence

**Sources:** F15; descriptions/reference requests in F21, F25, F28.

###### Exact bug

```js
// Wrong: index word.length is out of bounds.
for (let i = word.length; i >= 0; i--) {
  reversed += word[i];
}

// Correct:
for (let i = word.length - 1; i >= 0; i--) {
  reversed += word[i];
}
```

For `abc`, the wrong loop appends undefined before c,b,a. The workbook's suggested `word.length =1` is itself a typo: the correction is **minus one**, not assignment. The initial `/ 1. Function...` is also invalid JavaScript if copied literally; use `//`.

###### Corrected string functions

```js
function reverseWord(word) {
  if (typeof word !== "string") throw new TypeError("Expected a string");
  const characters = Array.from(word);
  const result = [];
  for (let i = characters.length - 1; i >= 0; i--) result.push(characters[i]);
  return result.join("");
}

function reverseSentence(sentence) {
  if (typeof sentence !== "string") throw new TypeError("Expected a string");
  // Preserve repeated ASCII spaces like the supplied manual split.
  return sentence.split(" ").map(reverseWord).reverse().join(" ");
}
```

**Explanation:** Reverse letters in each word, then reverse word order, as the source requests. `Hello world` becomes `dlrow olleH`. Reversing only word order would instead give `world Hello` and would not satisfy this source. Array.from handles Unicode code points, not every grapheme cluster; ask about combined characters if relevant.

###### Database code: what can and cannot be concluded

The supplied `connectToMySQL` returns a connection before its asynchronous callback completes and only logs connection failures. That timing is not automatically a bug with a driver that queues queries, but it makes readiness/failure hard for callers to handle. The `mysql` import is not shown. Query text and fetch-string code are absent, so SQL injection cannot be proved from the snippet alone.

For one connection, return a promise-based connection and let the caller catch failures. For a long-running backend, reuse a pool instead of opening one connection for every sentence. Keep credentials in configuration and use bound SQL parameters. The following is an illustrative mysql2 implementation; table/column names are assumed, not provided by the workbook.

```js
// Database module: requires mysql2 in the actual project.
// import mysql from "mysql2/promise";
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
// });

function makeReadAndReverseSentence(pool) {
  return async function readAndReverseSentence(id) {
    if (!Number.isSafeInteger(id) || id <= 0) throw new TypeError("Invalid sentence ID");
    const [rows] = await pool.execute(
      "SELECT content FROM sentences WHERE id = ? LIMIT 1", [id]
    );
    if (!rows.length) return null;
    return reverseSentence(rows[0].content);
  };
}
```

**Tests:** empty string, one letter, spaces, multiple words, repeated spaces, punctuation, non-string input, non-BMP character, database missing row/failure, and invalid ID. Mock the pool to verify query parameters without exposing credentials. A live database integration test is separate.

### Question 2 in this cell

Fix paid gym membership counts and implement addWorkout and getAverageWorkoutDurations.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
First question, same as 15.
Second question, same as 16 - gym membership.
```

</details>

#### Problems in this snippet

- This cell references the gym question without repeating its implementation.
- Use the supplied gym version’s paid-count correction and implement its missing workout methods as shown below.

#### Corrected answer and explanation

##### I. Gym membership statistics and average workout durations

**Sources:** F8/F9 describe the issue; F16/F17 contain one version; F28 contains another version; F21 references the gym task.

###### Errors and differences

- F16/F17 only count SILVER as paid; GOLD must count too.
- F28 **already checks SILVER or GOLD**, so that fix is not missing there.
- Dividing by zero for an empty gym produces NaN; choose a documented empty conversion rate. This answer uses 0%.
- F16/F17 omit addWorkout/getAverageWorkoutDurations. F28 includes empty placeholders and has no workouts storage.
- A standalone `Coding Question 2:` line outside a comment is invalid source if copied literally.
- Do not use `status !== BRONZE` as the only paid check unless the status domain is validated; unknown values would accidentally count as paid.

###### Corrected complete classes

```js
class MembershipStatus {
  static BRONZE = 1;
  static SILVER = 2;
  static GOLD = 3;
}

class Member {
  constructor(memberId, name, membershipStatus = MembershipStatus.BRONZE) {
    this.memberId = memberId;
    this.name = name;
    this.membershipStatus = membershipStatus;
  }
  isEqual(other) {
    return other instanceof Member && this.memberId === other.memberId &&
      this.name === other.name && this.membershipStatus === other.membershipStatus;
  }
  toString() {
    return `Member ID: ${this.memberId}, Name: ${this.name}, Membership Status: ${this.membershipStatus}`;
  }
}

class Workout {
  constructor(id, startTime, endTime) {
    if (!Number.isFinite(startTime) || !Number.isFinite(endTime) ||
        startTime < 0 || endTime > 1440 || endTime < startTime) {
      throw new RangeError("Invalid same-day workout times");
    }
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }
  getDuration() { return this.endTime - this.startTime; }
}

class Membership {
  constructor(members = []) {
    this.members = [];
    this.memberById = new Map();
    this.workouts = new Map();
    for (const member of members) this.addMember(member);
  }
  addMember(member) {
    if (this.memberById.has(member.memberId)) throw new Error("Duplicate member ID");
    this.members.push(member);
    this.memberById.set(member.memberId, member);
  }
  updateMembership(memberId, status) {
    if (![MembershipStatus.BRONZE, MembershipStatus.SILVER, MembershipStatus.GOLD].includes(status)) {
      throw new Error("Invalid membership status");
    }
    const member = this.memberById.get(memberId);
    if (member) member.membershipStatus = status;
  }
  getMembershipStatistics() {
    const totalMembers = this.members.length;
    const totalPaidMembers = this.members.filter((member) =>
      member.membershipStatus === MembershipStatus.SILVER ||
      member.membershipStatus === MembershipStatus.GOLD
    ).length;
    const conversionRate = totalMembers ? totalPaidMembers / totalMembers * 100 : 0;
    return { totalMembers, totalPaidMembers, conversionRate };
  }
  addWorkout(memberId, workout) {
    if (!this.memberById.has(memberId)) return;
    if (!this.workouts.has(memberId)) this.workouts.set(memberId, []);
    this.workouts.get(memberId).push(workout);
  }
  getAverageWorkoutDurations() {
    const averages = new Map();
    for (const [memberId, workouts] of this.workouts) {
      const total = workouts.reduce((sum, workout) => sum + workout.getDuration(), 0);
      averages.set(memberId, total / workouts.length);
    }
    return averages;
  }
}
```

**Explanation:** Store workouts by member ID. Ignore unknown members as requested. Average each member's own sessions; do not divide by total members. Members without sessions are omitted from the returned Map, a policy consistent with the supplied checks. Input workout IDs are assumed unique as stated; repeated-submission policy is unspecified.

F16/F17 expected averages: ID12=25, ID22=50, ID31=70. F28 changes one session from 40 to 45 minutes, so ID31 is **72.5**, not 70. Unknown member ID4 must be absent. The fifth/sixth member variations change paid conversion from 60% to about 66.67%; do not hardcode either answer. Statistics O(M), workout insertion average O(1), averages O(W), storage O(M+W).

## Javascript - BE!F22

### Question 1 in this cell

Parse tollbooth entries correctly and count completed journeys. In the longer versions, identify speeding journeys. The shortened report instead asks for unique cars with both event types.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```js
"use strict";
 
const assert = require('assert');
const fs = require("fs");
 
/*
We are writing software to analyze logs for toll booths on a highway. This highway is a divided highway with limited access; the only way on to or off of the highway is through a toll booth.
 
There are three types of toll booths:
* ENTRY (E in the diagram) toll booths, where a car goes through a booth as it enters the highway.
* EXIT (X in the diagram) toll booths, where a car goes through a booth as it exits the highway.
* MAINROAD (M in the diagram), which have sensors that record a license plate as a car drives through at full speed.
 
 
        Exit Booth                         Entry Booth
            |                                   |
            X                                   E
             \                                 /
---<------------<---------M---------<-----------<---------<----
                                         (West-bound side)
 
===============================================================
 
                                         (East-bound side)
------>--------->---------M--------->--------->--------->------
             /                                 \
            E                                   X
            |                                   |
        Entry Booth                         Exit Booth
 
 
For our first task:
1-1) Read through and understand the code and comments below. Feel free to run the code and tests.
1-2) The tests are not passing due to a bug in the code. Make the necessary changes to LogEntry to fix the bug.
*/
 
/*
We are interested in how many people are using the highway, and so we would like to count how many complete journeys are taken in the log file.
 
A complete journey consists of:
* A driver entering the highway through an ENTRY toll booth.
* The driver passing through some number of MAINROAD toll booths (possibly 0).
* The driver exiting the highway through an EXIT toll booth.
 
For example, the following excerpt of log lines contains complete journeys for the cars with JOX304 and THX138:
 
.
.
.
90750.191 JOX304 250E ENTRY
91081.684 JOX304 260E MAINROAD
91082.101 THX138 110E ENTRY
91483.251 JOX304 270E MAINROAD
91873.920 THX138 120E MAINROAD
91874.493 JOX304 280E EXIT
.
.
91982.102 THX138 290E EXIT
92301.302 THX138 300E ENTRY
92371.302 THX138 310E EXIT
.
 
→ This log contains 3 complete journeys:
  • JOX304: 1 journey
  • THX138: 2 journeys
 
You may assume that the log only contains complete journeys, and there are no missing entries.
 
2-1) Write a function in LogFile named countJourneys() that returns how many
     complete journeys there are in the given LogFile.
*/
 
/*
We would like to catch people who are driving at unsafe speeds on the highway. To help us do that, we would like to identify journeys where a driver does either of the following:
* Drive 130 km/h or greater in any individual 10km segment of tollway.
* Drive 120 km/h or greater in any two 10km segments of tollway.
 
For example, consider the following log:
90750.191 JOX304 250E ENTRY
91081.684 JOX304 260E MAINROAD
91082.101 THX138 110E ENTRY
91483.251 JOX304 270E MAINROAD
91873.920 THX138 120E MAINROAD
91874.493 JOX304 280E EXIT
.
.
91982.102 THX138 290E EXIT
92301.302 THX138 300E ENTRY
92371.302 THX138 310E EXIT
.
.
1000.000 TST002 270W ENTRY
1275.000 TST002 260W EXIT
 
In this case, the driver of TST002 drove 10 km in 275 seconds. We can calculate
that this driver drove an average speed of ~130.91km/hr over this segment:
 
10 km * 3600 sec/hr
------------------- = 130.91 km/hr
      275 sec
 
Note that:
* A license plate may have multiple journeys in one file, and if they drive at unsafe speeds in both journeys, both should be counted.
* We do not mark speeding if they are not on the highway (i.e. for any driving between an EXIT and ENTRY event).
* Speeding is only marked once per journey. For example, if there are 4 segments 120km/h or greater, or multiple segments 130km/h or greater, the journey is only counted once.
 
3-1) Write a function catchSpeeders in LogFile that returns a collection of license plates that drove at unsafe speeds during a journey in the LogFile.
     If the same license plate drives at unsafe speeds during two different journeys, the license plate should appear twice (once for each journey they drove at unsafe speeds).
*/
class LogEntry {
  /**
   * Represents an entry from a single log line.
   * 
   * Log lines look like this in the file:
   * 34400.409 SXY288 210E ENTRY
   * 
   * Where:
   * -> 34400.409 is the timestamp in seconds since the software was started.
   * -> SXY288 is the license plate of the vehicle passing through the toll booth.
   * -> 210E is the location and traffic direction of the toll booth. Here, the
   *      toll booth is at 210 kilometers from the start of the tollway, and the E
   *      indicates that the toll booth was on the east-bound traffic side.
   *      Tollbooths are placed every ten kilometers.
   * -> ENTRY indicates which type of toll booth the vehicle went through. This is
   *      one of "ENTRY", "EXIT", or "MAINROAD".
   */
  constructor(logLine) {
    // REVIEW IMPROVEMENT: trim().split(/\s+/) tolerates repeated spaces and tabs.
    const tokens = logLine.split(' ');
    // REVIEW CORRECT: This copy already converts fractional timestamps to Number.
    this.timestamp = Number(tokens[0]);
    this.license_plate = tokens[1];
    this.booth_type = tokens[3];
    this.location = parseInt(tokens[2].slice(0, -1));
    const directionLetter = tokens[2].slice(-1);
    if (directionLetter === 'E') {
      this.direction = 'EAST';
    } else if (directionLetter === 'W') {
      this.direction = 'WEST';
    } else {
      throw new Error('Invalid direction letter');
    }
  }
 
  toString() {
    return `<LogEntry timestamp: ${this.timestamp} license: ${this.license_plate} location: ${this.location} direction: ${this.direction} booth type: ${this.booth_type}>`;
  }
}
 
class LogFile {
  /**
   * Represents a file containing a number of log lines, converted to LogEntry objects.
   */
  constructor(fileContents) {
    this.logEntries = [];
    const lines = fileContents.split('\n');
    for (const line of lines) {
      if (line.trim()) {
        const logEntry = new LogEntry(line.trim());
        this.logEntries.push(logEntry);
      }
    }
  }
 
  get length() {
    return this.logEntries.length;
  }
 
  item(index) {
    return this.logEntries[index];
  }
  countJourneys(){
    // REVIEW CORRECT: Counting EXIT events works under the stated complete-log assumption.
    return this.logEntries.filter(e=>e.booth_type==='EXIT').length;
  }
}
 
const testMethods = {
  // These tests are not meant to be exhaustive, and primarily show usage.
  testLogFile: () => {
    const logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_small.log", "utf-8"));
    assert(logFile.length === 13);
    for (const entry of logFile.logEntries) {
      assert(entry instanceof LogEntry);
    }
  },
  testLogEntry: () => {
    let logLine = '44776.619 KTB918 310E MAINROAD';
    let logEntry = new LogEntry(logLine);
    assert(logEntry.timestamp === 44776.619);
    assert(logEntry.license_plate === 'KTB918');
    assert(logEntry.location === 310);
    assert(logEntry.direction === 'EAST');
    assert(logEntry.booth_type === 'MAINROAD');
 
    logLine = '52160.132 ABC123 400W ENTRY';
    logEntry = new LogEntry(logLine);
    assert(logEntry.timestamp === 52160.132);
    assert(logEntry.license_plate === 'ABC123');
    assert(logEntry.location === 400);
    assert(logEntry.direction === 'WEST');
    assert(logEntry.booth_type === 'ENTRY');
  },
    testCountJourneys: () => {
      let logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_small.log", "utf-8"));
      assert.strictEqual(logFile.countJourneys(), 3);
    
      logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_medium.log", "utf-8"));
      assert.strictEqual(logFile.countJourneys(), 63);
  },
    // REVIEW MISSING: Implement LogFile.catchSpeeders for these tests; count each unsafe journey only once.
    testCatchSpeeders: () => {
      let logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_speeders.log", "utf-8"));
      let ticketList = logFile.catchSpeeders();
      // ticketList should be a list similar to
      // ["TST002", "TST003", "TST003"]
      // In this case, TST002 had one journey with unsafe driving, and
      // TST003 had two journeys with unsafe driving. The license plates
      // may be in any order.
      assert(ticketList.filter((ticket) => ticket === "TST002").length === 1);
      assert(ticketList.filter((ticket) => ticket === "TST003").length === 2);
      assert((new Set(ticketList)).size === 2);
 
      logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_medium.log", "utf-8"));
      ticketList = logFile.catchSpeeders();
      assert(ticketList.length === 10);
 
      logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_long.log", "utf-8"));
      ticketList = logFile.catchSpeeders();
      assert(ticketList.length === 129);
  },
}
 
// run all tests
Object.getOwnPropertyNames(testMethods).forEach((func) => {
  try {
    console.log(`Running ${func}`);
    testMethods[func]();
    console.log('OK');
  } catch (e) {
    console.log('FAIL');
    console.log(e);
  }
  console.log('');
});
```

</details>

#### Problems in this snippet

- Numeric timestamp conversion and countJourneys are already implemented in this copy.
- catchSpeeders is missing. Apply the per-segment thresholds within each journey and allow repeat plates across different journeys.
- Original file-based tests need external fixtures that are not supplied.

#### Corrected answer and explanation

##### F. Tollbooth parsing, completed journeys and speeding

**Sources:** F7, F12, F22, F26, F27.

###### Errors and differences between rows

- F7/F26 describe a string-versus-number timestamp bug. Convert with `Number`, not parseInt, because timestamps include fractions.
- F12/F22/F27 **already use `Number(tokens[0])`**. Do not add a nonexistent conversion fix to those copies.
- `split(' ')` is fragile with repeated whitespace; use trim/split(/\s+/).
- F12 leaves a standalone empty `countJourneys(logs)` function, while tests call `logFile.countJourneys()`. Implement the method on LogFile.
- F22/F27 already count EXIT events correctly under the explicit complete-log assumption. Their missing task is catchSpeeders.
- F12 contains copied unmatched/nested comment delimiters. Clean the wrapper before running it.
- Test log files under `/content/test/...` are not included in the workbook; the original file-based totals cannot be independently rerun without those fixtures.

###### Corrected classes

```js
class LogEntry {
  constructor(logLine) {
    const tokens = logLine.trim().split(/\s+/);
    if (tokens.length !== 4) throw new Error("Expected four log fields");
    const [timestamp, plate, locationDirection, type] = tokens;
    const match = /^(\d+)([EW])$/.exec(locationDirection);
    if (!match) throw new Error("Invalid location/direction");
    if (!["ENTRY", "EXIT", "MAINROAD"].includes(type)) throw new Error("Invalid booth type");
    this.timestamp = Number(timestamp);
    if (!Number.isFinite(this.timestamp)) throw new Error("Invalid timestamp");
    this.license_plate = plate;
    this.location = Number(match[1]);
    this.direction = match[2] === "E" ? "EAST" : "WEST";
    this.booth_type = type;
  }
  toString() {
    return `<LogEntry timestamp: ${this.timestamp} license: ${this.license_plate} location: ${this.location} direction: ${this.direction} booth type: ${this.booth_type}>`;
  }
}

class LogFile {
  constructor(contents) {
    this.logEntries = contents.split(/\r?\n/).filter((line) => line.trim())
      .map((line) => new LogEntry(line));
  }
  get length() { return this.logEntries.length; }
  item(index) { return this.logEntries[index]; }

  countJourneys() {
    // The question guarantees complete journeys and no missing entries.
    return this.logEntries.reduce((count, entry) =>
      count + (entry.booth_type === "EXIT" ? 1 : 0), 0);
  }

  catchSpeeders() {
    const byPlate = new Map();
    for (const entry of this.logEntries) {
      if (!byPlate.has(entry.license_plate)) byPlate.set(entry.license_plate, []);
      byPlate.get(entry.license_plate).push(entry);
    }
    const tickets = [];
    for (const [plate, entries] of byPlate) {
      entries.sort((a, b) => a.timestamp - b.timestamp);
      let journey = null;
      for (const entry of entries) {
        if (entry.booth_type === "ENTRY") {
          journey = { previous: entry, segments120: 0, unsafe: false };
          continue;
        }
        if (!journey) continue; // Ignore driving outside the highway.
        const previous = journey.previous;
        const seconds = entry.timestamp - previous.timestamp;
        const distance = Math.abs(entry.location - previous.location);
        if (seconds <= 0 || entry.direction !== previous.direction) {
          throw new Error("Invalid journey sequence");
        }
        // Individual 10km speed cannot be inferred from a gap of multiple booths.
        if (distance !== 10) throw new Error("Expected consecutive 10km booth records");
        const speed = distance * 3600 / seconds;
        if (speed >= 130) journey.unsafe = true;
        if (speed >= 120) journey.segments120++;
        if (journey.segments120 >= 2) journey.unsafe = true;
        journey.previous = entry;

        if (entry.booth_type === "EXIT") {
          if (journey.unsafe) tickets.push(plate);
          journey = null;
        }
      }
    }
    return tickets;
  }
}
```

**Explanation:** A journey is ENTRY through EXIT; MAINROAD events do not start or end it. Calculate km/h as distance * 3600 / elapsed seconds. Use absolute distance for westbound journeys. Flag either one segment >=130 or any two segments >=120 (not necessarily adjacent). Append at most one ticket per journey, but allow the same plate again for a different journey. Sorting per vehicle supports interleaved logs; it is O(L log L) overall, or O(L) processing if per-vehicle chronological order is already guaranteed. Complete 10km sensor records are assumed; gaps do not prove individual-segment speeds.

###### Different task in F7/F26: count cars, not journeys

Those shortened reports ask for cars with at least one entry and exit. That counts a car once, even if it made two trips. Do not confuse it with F12/F22/F27, which explicitly count trips.

```js
function countCarsWithEntryAndExit(entries) {
  const flags = new Map();
  for (const entry of entries) {
    const plate = entry.license_plate;
    if (!flags.has(plate)) flags.set(plate, { entry: false, exit: false });
    const state = flags.get(plate);
    const type = entry.booth_type.toUpperCase();
    if (type === "ENTRY") state.entry = true;
    if (type === "EXIT") state.exit = true;
  }
  return [...flags.values()].filter((value) => value.entry && value.exit).length;
}
```

This matches the simplified “has both event types” statement; for actually paired valid trips use an ENTRY/EXIT state machine. Clarify which result is required.

## Javascript - BE!F23

### Question 1 in this cell

Return unique tiles reachable in one die roll, applying at most one teleporter and never passing the final tile.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
/* 

We're building the game engine for Thrilling Teleporters, a board game with N+1 tiles, starting from tile 0.

Certain tiles contain teleporters that instantly move the player to a specific tile, either forward or backward. For example, here are three teleporters:

teleporters1 = [
  "3,1", -- From tile 3 to tile  1
  "4,2", -- From tile 4 to tile  2
  "5,10" -- From tile 5 to tile 10
]

Or as seen on the board:

       "3,1"
     ┌─<───<─┐                                    N = 12
     v       │
 0 → 1 → 2 → 3 . 4 . 5 . 6 → 7 → 8 → 9 → 10 → 11 → 12
         ^       │   │                    ^
         └─<───<─┘   └──>───>───>───>───>──┘
           "4,2"             "5,10"

After rolling the die:
- The player moves forward by the number rolled.
- If the player lands on a tile with a teleporter, they are immediately sent to its destination.
- The player can’t move past the final tile N, and only one teleporter is used per die roll.
To add variety, the die can have any number of sides (minimum 2).

Write a function that returns all unique tiles the player can reach in a single die roll, given:

- A list of teleporter strings
- The number of sides on the die
- The player's starting tile
- The total number of tiles N

Example:
The player starts at tile 0 on a board of size N = 12, using a standard 6-sided die and the teleporters defined earlier.

teleporters1 = [
  "3,1", -- From tile 3 to tile  1
  "4,2", -- From tile 4 to tile  2
  "5,10" -- From tile 5 to tile 10
]

They can roll values from 1 to 6, leading to the following tile outcomes: [_, _, _, _, _, _].
- Rolling 1, 2, or 6 lands the player on tiles with no teleporters, so they stay on those tiles → [1, 2, _, _, _, 6].
- Rolling 3 activates a teleporter from tile 3 to tile 1 → updated list: [1, 2, 1, _, _, 6].
- Rolling 4 teleports the player from tile 4 to tile 2 → updated list: [1, 2, 1, 2, _, 6].
- Rolling 5 teleports the player from tile 5 to tile 10 → final list: [1, 2, 1, 2, 10, 6].
Removing duplicates, the final possible tiles are: [1, 2, 10, 6].

Additional Inputs:
teleporters2 = ["5,10", "6,22", "39,40", "40,49", "47,29"]
teleporters3 = ["6,18", "36,26", "41,21", "49,55", "54,52",
                "71,58", "74,77", "78,76", "80,73", "92,85"]
teleporters4 = ["97,93", "99,81", "36,33", "92,59", "17,3",
                "82,75", "4,1", "84,79", "54,4", "88,53",
                "91,37", "60,57", "61,7", "62,51", "31,19"]
teleporters5 = ["3,8", "8,9", "9,3"]

All Test Cases:
(output can be in any order)

                           die  start   
                          sides,tile  N
destinations(teleporters1,  6,    0,  12) => [1, 2, 10, 6]
destinations(teleporters2,  6,   46, 100) => [48, 49, 50, 51, 52, 29]
destinations(teleporters2, 10,    0,  50) => [1, 2, 3, 4, 7, 8, 9, 10, 22]
destinations(teleporters3, 10,   95, 100) => [96, 97, 98, 99, 100]
destinations(teleporters3, 10,   70, 100) => [72, 73, 75, 76, 77, 79, 58]
destinations(teleporters4,  6,    0, 100) => [1, 2, 3, 5, 6]
destinations(teleporters5,  7,    2,  20) => [3, 4, 5, 6, 7, 8, 9]

Complexity Variable:
N = number of tiles
Note: The number of teleporters, T, and the size of the die, D, are bounded by N.

*/

"use strict";

const teleporters1 = ['3,1', '4,2', '5,10'];
const teleporters2 = ['5,10', '6,22', '39,40', '40,49', '47,29'];
const teleporters3 = ['6,18', '36,26', '41,21', '49,55', '54,52',
                      '71,58', '74,77', '78,76', '80,73', '92,85'];
const teleporters4 = ['97,93', '99,81', '36,33', '92,59', '17,3',
                      '82,75', '4,1', '84,79', '54,4', '88,53',
                      '91,37', '60,57', '61,7', '62,51', '31,19'];
const teleporters5 = ['3,8', '8,9', '9,3'];

/*
```

</details>

#### Problems in this snippet

- Only input arrays are supplied; there is no destinations function to debug.
- An unclosed trailing comment is a copying artifact. Follow only one teleport, skip overshooting rolls and deduplicate outcomes.

#### Corrected answer and explanation

##### J. Thrilling Teleporters: all destinations in one roll

**Source:** F23.

**Question:** Enumerate unique reachable tiles, using no more than one teleporter per roll and never moving past N.

**Source status:** Teleporter arrays are supplied but there is no function implementation. The cell ends with an unclosed comment. There is no hidden algorithm bug to diagnose.

```js
function destinations(teleporters, dieSides, start, lastTile) {
  const jumps = new Map(teleporters.map((value) => value.split(",").map(Number)));
  const result = new Set();
  for (let roll = 1; roll <= dieSides && start + roll <= lastTile; roll++) {
    const landing = start + roll;
    result.add(jumps.has(landing) ? jumps.get(landing) : landing);
  }
  return [...result];
}
```

**Explanation:** Try valid rolls, perform a single lookup and deduplicate. Do not chain teleports even when a destination is also a start. The provided near-end test excludes overshooting rolls. Time/space O(T+D), bounded by O(N) under the source's constraints.

## Javascript - BE!F24

### Question 1 in this cell

This cell contains a reference, interview account, or missing/corrupted question rather than a complete supplied code snippet.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
"Introduction ~ 1 minutes - where needs to mention what technolgies you have worked on and experience.
Section 1 - Its around 25-30 minutes where 4-5 Advance Nodejs streaming and Database question was there where he asked 3-4 different questions each questions was 5-10 minutes where you need to optimize the code, write the better approach to handle and security concerns and fix.

Section 2 - IDE was cleared to unable to copy the exact question 
Questions was related to DSA puzzle where problem was related to implementation of security systems for corporate with multiple scenarios. It was quite lengthy and complex where needs to understand the problem and tell them write approach with complete code. Complete coding is mandatory here."
```

</details>

#### Problems in this snippet

- Actual streaming/database snippets and security-puzzle rules are missing. Exact bugs and a complete puzzle answer cannot be established.

#### Corrected answer and explanation

##### L. Missing questions, broken references and copying errors

- **F2:** “Same Questions as the below one.F2+F2” is a broken/self-referential note, not a code snippet. The following row's questions are covered, but the exact intended reference cannot be established.
- **F6:** “Retrieving data. Wait a few seconds...” is a spreadsheet copying error, not a question or JavaScript exception.
- **F18:** Refers to the stock task and describes the interview process; it supplies no new code.
- **F20:** “Combination of row 2 and 10” does not reliably identify which numbering convention was used. It adds no implementation; see the linked admin/stock answers without treating the reference as proof of exact source.
- **F21:** Refers to the MySQL/string task and gym task; see H and I.
- **F24:** Mentions Node streaming/database discussion and a corporate-security coding puzzle but omits the snippets and actual puzzle requirements. A complete exact solution cannot be produced from that description. General review areas include backpressure, avoiding unnecessary buffering, error propagation, releasing resources, parameterized database access and trusted authorization. These are investigation points, not demonstrated defects in unseen code. Node's HTTP request/response model is documented in the [official API reference](https://nodejs.org/api/http.html).
- **F25/F28 database-string review:** The database query itself is not included. Evaluate repeated reads, pooling, selecting only required columns, input validation and parameter binding once the actual query is available; do not claim proven injection or hardcoded credentials without evidence.

##### Verification

The corrected stock classes passed the original tests extracted from F10, F13, F14 and F19. The corrected gym classes passed the original tests from F16, F17 and F28, including their different average durations. All corrected JavaScript implementation blocks were parsed. Additional checks passed for whitespace/numeric log parsing, completed journeys, one-ticket-per-journey speeding, repeated speeding journeys, all seven original teleporter cases, string reversal, duplicate IDs, empty/negative transaction maxima, grouped todos, profile validation, final connection counts, and mocked handler authorization/method/input handling.

The DOM applications, live HTTP endpoints, and real MySQL connections were not integration-tested. Workbook tollbooth fixture files under /content/test are absent; their expected totals were not rerun. Examples marked as reconstructions depend on the documented assumptions and injected services. The workbook itself was not edited.

## Javascript - BE!F25

### Question 1 in this cell

Debug the MySQL/string-processing code, correct reverseWord, improve readability/data access, and explain test cases.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Introduction - 1 Minute

Section -1 (Existing Code Review and Refactor)
A Code block with a function to fetch a string from database, a function to reverse a sentence and a function to reverse words was given. 
Q1: Explain the code in detail with maximum details
Q2: What would you do to improve the readability and maintainabilty
Q3: What are the data access ineffiency that you are observing in the code
Q4: What are the security flaws that you are seeing in the code and how woud you fix it
```

</details>

#### Problems in this snippet

- The database/string functions are described but not copied, so no exact query or connection defect can be proven from this row.
- F15 contains the actual reverseWord implementation; its index correction and reference database improvements are shown below.

#### Corrected answer and explanation

##### H. MySQL access, reverseWord and reverseSentence

**Sources:** F15; descriptions/reference requests in F21, F25, F28.

###### Exact bug

```js
// Wrong: index word.length is out of bounds.
for (let i = word.length; i >= 0; i--) {
  reversed += word[i];
}

// Correct:
for (let i = word.length - 1; i >= 0; i--) {
  reversed += word[i];
}
```

For `abc`, the wrong loop appends undefined before c,b,a. The workbook's suggested `word.length =1` is itself a typo: the correction is **minus one**, not assignment. The initial `/ 1. Function...` is also invalid JavaScript if copied literally; use `//`.

###### Corrected string functions

```js
function reverseWord(word) {
  if (typeof word !== "string") throw new TypeError("Expected a string");
  const characters = Array.from(word);
  const result = [];
  for (let i = characters.length - 1; i >= 0; i--) result.push(characters[i]);
  return result.join("");
}

function reverseSentence(sentence) {
  if (typeof sentence !== "string") throw new TypeError("Expected a string");
  // Preserve repeated ASCII spaces like the supplied manual split.
  return sentence.split(" ").map(reverseWord).reverse().join(" ");
}
```

**Explanation:** Reverse letters in each word, then reverse word order, as the source requests. `Hello world` becomes `dlrow olleH`. Reversing only word order would instead give `world Hello` and would not satisfy this source. Array.from handles Unicode code points, not every grapheme cluster; ask about combined characters if relevant.

###### Database code: what can and cannot be concluded

The supplied `connectToMySQL` returns a connection before its asynchronous callback completes and only logs connection failures. That timing is not automatically a bug with a driver that queues queries, but it makes readiness/failure hard for callers to handle. The `mysql` import is not shown. Query text and fetch-string code are absent, so SQL injection cannot be proved from the snippet alone.

For one connection, return a promise-based connection and let the caller catch failures. For a long-running backend, reuse a pool instead of opening one connection for every sentence. Keep credentials in configuration and use bound SQL parameters. The following is an illustrative mysql2 implementation; table/column names are assumed, not provided by the workbook.

```js
// Database module: requires mysql2 in the actual project.
// import mysql from "mysql2/promise";
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
// });

function makeReadAndReverseSentence(pool) {
  return async function readAndReverseSentence(id) {
    if (!Number.isSafeInteger(id) || id <= 0) throw new TypeError("Invalid sentence ID");
    const [rows] = await pool.execute(
      "SELECT content FROM sentences WHERE id = ? LIMIT 1", [id]
    );
    if (!rows.length) return null;
    return reverseSentence(rows[0].content);
  };
}
```

**Tests:** empty string, one letter, spaces, multiple words, repeated spaces, punctuation, non-string input, non-BMP character, database missing row/failure, and invalid ID. Mock the pool to verify query parameters without exposing credentials. A live database integration test is separate.

### Question 2 in this cell

Process connection/disconnection logs and group users by whether their final connection count is below N or at least N.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Section -2 (DSA - Blank Page Coding)
*** Couldnt copy exact question since IDE is cleared, reconstructed the same question
with own dataset ***
/*

The Question was related to a Social Media Platform wherein users Connect (Follow) and Disconnect (unfollow) each other. 


const logs1 = [
  ["CONNECT","Alice","Bob"],
  ["CONNECT","Carol","Dave"],
  ["CONNECT","Eve","Frank"],
  ["CONNECT","Grace","Heidi"],
  ["CONNECT","Ivan","Judy"],
  ["DISCONNECT","Alice","Bob"],
  ["CONNECT","Alice","Carol"],
  ["DISCONNECT","Carol","Dave"],
  ["CONNECT","Dave","Eve"],
  ["DISCONNECT","Eve","Frank"],
  ["CONNECT","Frank","Grace"],
  ["DISCONNECT","Grace","Heidi"],
  ["CONNECT","Heidi","Ivan"],
  ["DISCONNECT","Ivan","Judy"],
  ["DISCONNECT","Frank","Grace"],
];

const logs2 = [
  ["CONNECT","Alice","Bob"],
  ["CONNECT","Carol","Dave"],
  ["CONNECT","Eve","Frank"],
  ["CONNECT","Grace","Heidi"],
  ["CONNECT","Ivan","Judy"],
  ["CONNECT","Alice","Carol"],
  ["DISCONNECT","Alice","Bob"],
  ["CONNECT","Bob","Dave"],
  ["DISCONNECT","Carol","Dave"],
  ["CONNECT","Carol","Eve"],
  ["DISCONNECT","Eve","Frank"],
  ["CONNECT","Frank","Ivan"],
  ["DISCONNECT","Ivan","Judy"],
  ["CONNECT","Judy","Grace"],
  ["DISCONNECT","Grace","Heidi"],
  ["CONNECT","Heidi","Alice"],
  ["DISCONNECT","Alice","Carol"],
  ["DISCONNECT","Bob","Dave"],
  ["DISCONNECT","Carol","Eve"],
  ["DISCONNECT","Frank","Ivan"],
];

const logs3 = [
  ["CONNECT","Alice","Bob"],
  ["CONNECT","Carol","Dave"],
  ["CONNECT","Eve","Frank"],
  ["CONNECT","Grace","Heidi"],
  ["CONNECT","Ivan","Judy"],
  ["DISCONNECT","Carol","Dave"],
  ["CONNECT","Carol","Eve"],
  ["DISCONNECT","Alice","Bob"],
  ["CONNECT","Alice","Heidi"],
  ["DISCONNECT","Grace","Heidi"],
  ["CONNECT","Grace","Ivan"],
  ["DISCONNECT","Ivan","Judy"],
  ["CONNECT","Judy","Bob"],
  ["CONNECT","Dave","Frank"],
  ["DISCONNECT","Eve","Frank"],
  ["CONNECT","Eve","Heidi"],
  ["DISCONNECT","Alice","Heidi"],
  ["CONNECT","Alice","Carol"],
  ["DISCONNECT","Carol","Eve"],
  ["CONNECT","Carol","Grace"],
  ["DISCONNECT","Grace","Ivan"],
  ["DISCONNECT","Judy","Bob"],
  ["CONNECT","Ivan","Alice"],
  ["DISCONNECT","Dave","Frank"],
  ["DISCONNECT","Eve","Heidi"],
];


From the above log events, provide the list of users with fewer than N Connections and list of users with N or more connections (n will be given as input)

Input: array of logs, value N
Expected Output fortmat: [[list of users with less than N connections],[list of users with N or more connections]]

Time Complexity:
L - Logs

*/
```

</details>

#### Problems in this snippet

- The reconstructed social-network question supplies logs, not a solution function.
- Clarify whether connections are symmetric or directed follows before implementing the count.

#### Corrected answer and explanation

##### K. Social connections: group by final degree

**Source:** F25, reconstructed question/data.

**Question:** Process connects/disconnects and divide users by final connection count.

**Source limitation:** No solution is supplied, and this report uses both “follow” and “connect” without explicitly specifying whether edges are directed. Confirm that rule. The code below assumes **mutual connections**, matching the familiar symmetric variant. For outgoing follows, change only the follower's Set while still registering both users.

```js
function groupConnections(logs, n) {
  const connections = new Map();
  for (const [type, a, b] of logs) {
    if (!connections.has(a)) connections.set(a, new Set());
    if (!connections.has(b)) connections.set(b, new Set());
    if (type === "CONNECT") {
      connections.get(a).add(b);
      connections.get(b).add(a);
    } else if (type === "DISCONNECT") {
      connections.get(a).delete(b);
      connections.get(b).delete(a);
    }
  }
  const fewer = [];
  const atLeast = [];
  for (const [user, neighbors] of connections) {
    (neighbors.size < n ? fewer : atLeast).push(user);
  }
  return [fewer, atLeast];
}
```

**Explanation:** Count final unique neighbors, not the number of CONNECT events. Keep users who end with zero connections. Average time O(L+U), space O(U+C), where C is final connections. For the three supplied logs with N=1 under the mutual assumption, zero-connection users are respectively: logs1 Bob/Frank/Grace/Judy; logs2 Bob/Carol/Dave/Eve/Frank/Ivan; logs3 Bob/Dave/Eve/Frank/Heidi/Judy.

## Javascript - BE!F26

### Question 1 in this cell

Explain and improve the admin-only highest-transaction endpoint. Fix duplicate user-ID handling and describe appropriate tests.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Problem 1:- Code snippet shown() where get, get2, httpsServerHandler function were written, question were asked to explain to code in detail. what could be improved in the code and what are the problem and the their solutions basically the code was related to removing duplicate user IDs, fetches each user's transactions, finds the highest transaction amount for each, and returns this data via an HTTP endpoint (for admins only)
request: {
  body: {
    userIds: [], // Array of duplicates user ids
    role: "ADMIN"
  }
}
Response will be there only if role is ADMIN.

Questions on snippet:
Explain the code and what exactly it will return.
Improve readability and maintanability
Unit tests for shown snippet
Given ['a','b','a','b','c'] and asked why the code is not returning correct output
```

</details>

#### Problems in this snippet

- The handler is described but its implementation is not copied.
- The related report’s off-by-one duplicate-ID bug is addressed below; authorization must use a trusted identity.

#### Corrected answer and explanation

##### A. Unique user IDs and highest transactions for an admin

**Sources:** F3, F8, F9, F26, F27; related references in F20.

**Question:** Explain an HTTP endpoint that deduplicates user IDs, reads transactions, returns the maximum amount for each user, and permits only admins. Improve readability, find the duplicate-ID bug, and propose tests.

###### What is actually wrong?

The implementation of `get`, `get2`, and `httpsServerHandler` is **not copied into the workbook**. F8/F9 report the concrete bug: the loop uses `i < a.length - 1`, so the final input is never examined. With `['a','b','a','b','c']`, the unique `c` is lost.

```js
// Wrong bound reported in the interview:
for (let i = 0; i < userIds.length - 1; i++) { /* ... */ }

// Correct bound:
for (let i = 0; i < userIds.length; i++) { /* ... */ }

// Simpler deduplication:
const uniqueUserIds = [...new Set(userIds)];
```

**Other issues to investigate, not invent:** The reports put `role` in `req.body`. A client-supplied role cannot establish authorization. Use identity/roles established by trusted authentication middleware. Raw Node HTTP requests do not automatically have a parsed `req.body`; an Express-style example must explicitly assume JSON middleware. Check input validation, error propagation, repeated database queries and response completion.

Initializing a maximum at `-1` is valid only under an explicitly nonnegative-amount/sentinel contract. This answer uses `null` for no transactions and also supports negative values. Never use `Math.max(...[])` without an empty case.

###### Corrected reference implementation

This is an **Express-style handler factory**. It assumes a trusted authentication middleware has set `req.user` and JSON middleware has parsed `req.body`. `getMaxByUserIds` is an injected repository method returning `{userId, maxAmount}` rows; the original schema and framework are not supplied.

```js
function uniqueIds(userIds) {
  if (!Array.isArray(userIds) || userIds.length > 1000) {
    throw new TypeError("userIds must be an array of at most 1000 IDs");
  }
  if (userIds.some((id) => typeof id !== "string" || !id.trim())) {
    throw new TypeError("Every user ID must be a nonempty string");
  }
  return [...new Set(userIds)];
}

function highestAmount(transactions) {
  if (transactions.length === 0) return null;
  let maximum = -Infinity;
  for (const transaction of transactions) {
    if (!Number.isFinite(transaction.amount)) {
      throw new TypeError("Transaction amounts must be finite numbers");
    }
    maximum = Math.max(maximum, transaction.amount);
  }
  return maximum;
}

function makeHighestTransactionsHandler(getMaxByUserIds) {
  return async function highestTransactionsHandler(req, res) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }
    if (!req.user) return res.status(401).json({ error: "Authentication required" });
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    let ids;
    try {
      ids = uniqueIds(req.body?.userIds);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    if (ids.length === 0) return res.status(200).json([]);

    try {
      const rows = await getMaxByUserIds(ids);
      const amounts = new Map(rows.map((row) => [row.userId, row.maxAmount]));
      return res.status(200).json(ids.map((userId) => ({
        userId,
        highestTransaction: amounts.get(userId) ?? null,
      })));
    } catch {
      return res.status(500).json({ error: "Unable to read transactions" });
    }
  };
}
```

**Database improvement:** If the schema supports it, use one parameterized aggregate query rather than reading every transaction per user. Example schema only:

```sql
SELECT user_id AS userId, MAX(amount) AS maxAmount
FROM transactions
WHERE user_id IN (?, ?, ?)
GROUP BY user_id;
```

Generate the placeholder count from the validated ID count and bind the ID values; do not concatenate input values into SQL. The schema, tenant constraints and driver decimal representation must match the real application. Do not assume database DECIMAL values are always JavaScript numbers. Prepared placeholders and promise-based access are documented by [MySQL2](https://sidorares.github.io/node-mysql2/docs).

**Tests:** empty IDs, all duplicates, unique final ID, one ID, invalid IDs, non-admin, unauthenticated, incorrect method, database failure, no transactions, zero amount and negative amounts if allowed. Verify `role: "ADMIN"` in the body cannot override a non-admin authenticated user.

**Explanation:** Deduplicate before database access. Separate validation, authorization, querying and response formatting. Database aggregation reduces transferred data and can avoid N+1 queries. `405` is the usual response for a recognized route with the wrong method; the reported original uses `404`, which should be checked against its intended contract rather than treated as a syntax error.

### Question 2 in this cell

Parse tollbooth entries correctly and count completed journeys. In the longer versions, identify speeding journeys. The shortened report instead asks for unique cars with both event types.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Problem 2:-  Problem Description: Car Journey Log Analysis
You are given a set of log entries that record cars passing through a tollbooth system. Each log entry contains the following information:
License Plate – a unique identifier for each car
Timestamp – the time at which the log was recorded
Log Type – one of the following:

"entry" – when a car enters the toll road
"exit" – when a car exits the toll road
"main road" – when a car passes through the tollbooth without entering or exiting


Direction of Travel – such as "east", "west", "north", or "south"
Additional Metadata – such as vehicle type, toll amount, or other relevant details

Task 1: Fix Assertion Error
There is an assertion error in the existing code that prevents the log entries from being printed correctly.
Issue: The error occurs because a log entry value (e.g., 234234.17) was being compared or asserted as a number, but it was treated as a string or something else.
Answer: The fix was to typecast the value to Number before performing the assertion or before printing it, which resolved the issue and allowed the logs to print correctly.
Task 2: Count Completed Journeys
Write a function that returns the number of cars that have completed a journey.
A journey is considered complete if a car has:

At least one "entry" log
At least one "exit" log

Cars that only have one of these logs or only "main road" logs should not be counted as having completed a journey.
```

</details>

#### Problems in this snippet

- The report describes numeric timestamp conversion but does not supply the parser code.
- Its simplified wording asks for unique cars with entry/exit, which differs from completed-journey count. Both variants are explained below.

#### Corrected answer and explanation

##### F. Tollbooth parsing, completed journeys and speeding

**Sources:** F7, F12, F22, F26, F27.

###### Errors and differences between rows

- F7/F26 describe a string-versus-number timestamp bug. Convert with `Number`, not parseInt, because timestamps include fractions.
- F12/F22/F27 **already use `Number(tokens[0])`**. Do not add a nonexistent conversion fix to those copies.
- `split(' ')` is fragile with repeated whitespace; use trim/split(/\s+/).
- F12 leaves a standalone empty `countJourneys(logs)` function, while tests call `logFile.countJourneys()`. Implement the method on LogFile.
- F22/F27 already count EXIT events correctly under the explicit complete-log assumption. Their missing task is catchSpeeders.
- F12 contains copied unmatched/nested comment delimiters. Clean the wrapper before running it.
- Test log files under `/content/test/...` are not included in the workbook; the original file-based totals cannot be independently rerun without those fixtures.

###### Corrected classes

```js
class LogEntry {
  constructor(logLine) {
    const tokens = logLine.trim().split(/\s+/);
    if (tokens.length !== 4) throw new Error("Expected four log fields");
    const [timestamp, plate, locationDirection, type] = tokens;
    const match = /^(\d+)([EW])$/.exec(locationDirection);
    if (!match) throw new Error("Invalid location/direction");
    if (!["ENTRY", "EXIT", "MAINROAD"].includes(type)) throw new Error("Invalid booth type");
    this.timestamp = Number(timestamp);
    if (!Number.isFinite(this.timestamp)) throw new Error("Invalid timestamp");
    this.license_plate = plate;
    this.location = Number(match[1]);
    this.direction = match[2] === "E" ? "EAST" : "WEST";
    this.booth_type = type;
  }
  toString() {
    return `<LogEntry timestamp: ${this.timestamp} license: ${this.license_plate} location: ${this.location} direction: ${this.direction} booth type: ${this.booth_type}>`;
  }
}

class LogFile {
  constructor(contents) {
    this.logEntries = contents.split(/\r?\n/).filter((line) => line.trim())
      .map((line) => new LogEntry(line));
  }
  get length() { return this.logEntries.length; }
  item(index) { return this.logEntries[index]; }

  countJourneys() {
    // The question guarantees complete journeys and no missing entries.
    return this.logEntries.reduce((count, entry) =>
      count + (entry.booth_type === "EXIT" ? 1 : 0), 0);
  }

  catchSpeeders() {
    const byPlate = new Map();
    for (const entry of this.logEntries) {
      if (!byPlate.has(entry.license_plate)) byPlate.set(entry.license_plate, []);
      byPlate.get(entry.license_plate).push(entry);
    }
    const tickets = [];
    for (const [plate, entries] of byPlate) {
      entries.sort((a, b) => a.timestamp - b.timestamp);
      let journey = null;
      for (const entry of entries) {
        if (entry.booth_type === "ENTRY") {
          journey = { previous: entry, segments120: 0, unsafe: false };
          continue;
        }
        if (!journey) continue; // Ignore driving outside the highway.
        const previous = journey.previous;
        const seconds = entry.timestamp - previous.timestamp;
        const distance = Math.abs(entry.location - previous.location);
        if (seconds <= 0 || entry.direction !== previous.direction) {
          throw new Error("Invalid journey sequence");
        }
        // Individual 10km speed cannot be inferred from a gap of multiple booths.
        if (distance !== 10) throw new Error("Expected consecutive 10km booth records");
        const speed = distance * 3600 / seconds;
        if (speed >= 130) journey.unsafe = true;
        if (speed >= 120) journey.segments120++;
        if (journey.segments120 >= 2) journey.unsafe = true;
        journey.previous = entry;

        if (entry.booth_type === "EXIT") {
          if (journey.unsafe) tickets.push(plate);
          journey = null;
        }
      }
    }
    return tickets;
  }
}
```

**Explanation:** A journey is ENTRY through EXIT; MAINROAD events do not start or end it. Calculate km/h as distance * 3600 / elapsed seconds. Use absolute distance for westbound journeys. Flag either one segment >=130 or any two segments >=120 (not necessarily adjacent). Append at most one ticket per journey, but allow the same plate again for a different journey. Sorting per vehicle supports interleaved logs; it is O(L log L) overall, or O(L) processing if per-vehicle chronological order is already guaranteed. Complete 10km sensor records are assumed; gaps do not prove individual-segment speeds.

###### Different task in F7/F26: count cars, not journeys

Those shortened reports ask for cars with at least one entry and exit. That counts a car once, even if it made two trips. Do not confuse it with F12/F22/F27, which explicitly count trips.

```js
function countCarsWithEntryAndExit(entries) {
  const flags = new Map();
  for (const entry of entries) {
    const plate = entry.license_plate;
    if (!flags.has(plate)) flags.set(plate, { entry: false, exit: false });
    const state = flags.get(plate);
    const type = entry.booth_type.toUpperCase();
    if (type === "ENTRY") state.entry = true;
    if (type === "EXIT") state.exit = true;
  }
  return [...flags.values()].filter((value) => value.entry && value.exit).length;
}
```

This matches the simplified “has both event types” statement; for actually paired valid trips use an ENTRY/EXIT state machine. Clarify which result is required.

## Javascript - BE!F27

### Question 1 in this cell

Explain and improve the admin-only highest-transaction endpoint. Fix duplicate user-ID handling and describe appropriate tests.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
First question: 

Code snippet shown() where get, get2, httpsServerHandler function were written, question were asked to explain to code in detail. what could be improved in the code and what are the problem and the their solutions basically the code was related to removing duplicate user IDs, fetches each user's transactions, finds the highest transaction amount for each, and returns this data via an HTTP endpoint (for admins only)
request: {
  body: {
    userIds: [], // Array of duplicates user ids
    role: "ADMIN"
  }
}
Response will be there only if role is ADMIN.

Questions on snippet:
Explain the code and what exactly it will return.
Improve readability and maintanability
Unit tests for shown snippet
Given ['a','b','a','b','c'] and asked why the code is not returning correct output.
```

</details>

#### Problems in this snippet

- The admin handler is described, not copied.
- The related deduplication report identifies a last-element loop bug; do not claim unseen handler lines have been inspected.

#### Corrected answer and explanation

##### A. Unique user IDs and highest transactions for an admin

**Sources:** F3, F8, F9, F26, F27; related references in F20.

**Question:** Explain an HTTP endpoint that deduplicates user IDs, reads transactions, returns the maximum amount for each user, and permits only admins. Improve readability, find the duplicate-ID bug, and propose tests.

###### What is actually wrong?

The implementation of `get`, `get2`, and `httpsServerHandler` is **not copied into the workbook**. F8/F9 report the concrete bug: the loop uses `i < a.length - 1`, so the final input is never examined. With `['a','b','a','b','c']`, the unique `c` is lost.

```js
// Wrong bound reported in the interview:
for (let i = 0; i < userIds.length - 1; i++) { /* ... */ }

// Correct bound:
for (let i = 0; i < userIds.length; i++) { /* ... */ }

// Simpler deduplication:
const uniqueUserIds = [...new Set(userIds)];
```

**Other issues to investigate, not invent:** The reports put `role` in `req.body`. A client-supplied role cannot establish authorization. Use identity/roles established by trusted authentication middleware. Raw Node HTTP requests do not automatically have a parsed `req.body`; an Express-style example must explicitly assume JSON middleware. Check input validation, error propagation, repeated database queries and response completion.

Initializing a maximum at `-1` is valid only under an explicitly nonnegative-amount/sentinel contract. This answer uses `null` for no transactions and also supports negative values. Never use `Math.max(...[])` without an empty case.

###### Corrected reference implementation

This is an **Express-style handler factory**. It assumes a trusted authentication middleware has set `req.user` and JSON middleware has parsed `req.body`. `getMaxByUserIds` is an injected repository method returning `{userId, maxAmount}` rows; the original schema and framework are not supplied.

```js
function uniqueIds(userIds) {
  if (!Array.isArray(userIds) || userIds.length > 1000) {
    throw new TypeError("userIds must be an array of at most 1000 IDs");
  }
  if (userIds.some((id) => typeof id !== "string" || !id.trim())) {
    throw new TypeError("Every user ID must be a nonempty string");
  }
  return [...new Set(userIds)];
}

function highestAmount(transactions) {
  if (transactions.length === 0) return null;
  let maximum = -Infinity;
  for (const transaction of transactions) {
    if (!Number.isFinite(transaction.amount)) {
      throw new TypeError("Transaction amounts must be finite numbers");
    }
    maximum = Math.max(maximum, transaction.amount);
  }
  return maximum;
}

function makeHighestTransactionsHandler(getMaxByUserIds) {
  return async function highestTransactionsHandler(req, res) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }
    if (!req.user) return res.status(401).json({ error: "Authentication required" });
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    let ids;
    try {
      ids = uniqueIds(req.body?.userIds);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    if (ids.length === 0) return res.status(200).json([]);

    try {
      const rows = await getMaxByUserIds(ids);
      const amounts = new Map(rows.map((row) => [row.userId, row.maxAmount]));
      return res.status(200).json(ids.map((userId) => ({
        userId,
        highestTransaction: amounts.get(userId) ?? null,
      })));
    } catch {
      return res.status(500).json({ error: "Unable to read transactions" });
    }
  };
}
```

**Database improvement:** If the schema supports it, use one parameterized aggregate query rather than reading every transaction per user. Example schema only:

```sql
SELECT user_id AS userId, MAX(amount) AS maxAmount
FROM transactions
WHERE user_id IN (?, ?, ?)
GROUP BY user_id;
```

Generate the placeholder count from the validated ID count and bind the ID values; do not concatenate input values into SQL. The schema, tenant constraints and driver decimal representation must match the real application. Do not assume database DECIMAL values are always JavaScript numbers. Prepared placeholders and promise-based access are documented by [MySQL2](https://sidorares.github.io/node-mysql2/docs).

**Tests:** empty IDs, all duplicates, unique final ID, one ID, invalid IDs, non-admin, unauthenticated, incorrect method, database failure, no transactions, zero amount and negative amounts if allowed. Verify `role: "ADMIN"` in the body cannot override a non-admin authenticated user.

**Explanation:** Deduplicate before database access. Separate validation, authorization, querying and response formatting. Database aggregation reduces transferred data and can avoid N+1 queries. `405` is the usual response for a recognized route with the wrong method; the reported original uses `404`, which should be checked against its intended contract rather than treated as a syntax error.

### Question 2 in this cell

Parse tollbooth entries correctly and count completed journeys. In the longer versions, identify speeding journeys. The shortened report instead asks for unique cars with both event types.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```js
got the same question as in the sheet i.e car (toolbooth) question.

"use strict";
 
const assert = require('assert');
const fs = require("fs");
 
/*
We are writing software to analyze logs for toll booths on a highway. This highway is a divided highway with limited access; the only way on to or off of the highway is through a toll booth.
 
There are three types of toll booths:
* ENTRY (E in the diagram) toll booths, where a car goes through a booth as it enters the highway.
* EXIT (X in the diagram) toll booths, where a car goes through a booth as it exits the highway.
* MAINROAD (M in the diagram), which have sensors that record a license plate as a car drives through at full speed.
 
 
        Exit Booth                         Entry Booth
            |                                   |
            X                                   E
             \                                 /
---<------------<---------M---------<-----------<---------<----
                                         (West-bound side)
 
===============================================================
 
                                         (East-bound side)
------>--------->---------M--------->--------->--------->------
             /                                 \
            E                                   X
            |                                   |
        Entry Booth                         Exit Booth
 
 
For our first task:
1-1) Read through and understand the code and comments below. Feel free to run the code and tests.
1-2) The tests are not passing due to a bug in the code. Make the necessary changes to LogEntry to fix the bug.
*/
 
/*
We are interested in how many people are using the highway, and so we would like to count how many complete journeys are taken in the log file.
 
A complete journey consists of:
* A driver entering the highway through an ENTRY toll booth.
* The driver passing through some number of MAINROAD toll booths (possibly 0).
* The driver exiting the highway through an EXIT toll booth.
 
For example, the following excerpt of log lines contains complete journeys for the cars with JOX304 and THX138:
 
.
.
.
90750.191 JOX304 250E ENTRY
91081.684 JOX304 260E MAINROAD
91082.101 THX138 110E ENTRY
91483.251 JOX304 270E MAINROAD
91873.920 THX138 120E MAINROAD
91874.493 JOX304 280E EXIT
.
.
91982.102 THX138 290E EXIT
92301.302 THX138 300E ENTRY
92371.302 THX138 310E EXIT
.
 
→ This log contains 3 complete journeys:
  • JOX304: 1 journey
  • THX138: 2 journeys
 
You may assume that the log only contains complete journeys, and there are no missing entries.
 
2-1) Write a function in LogFile named countJourneys() that returns how many
     complete journeys there are in the given LogFile.
*/
 
/*
We would like to catch people who are driving at unsafe speeds on the highway. To help us do that, we would like to identify journeys where a driver does either of the following:
* Drive 130 km/h or greater in any individual 10km segment of tollway.
* Drive 120 km/h or greater in any two 10km segments of tollway.
 
For example, consider the following log:
90750.191 JOX304 250E ENTRY
91081.684 JOX304 260E MAINROAD
91082.101 THX138 110E ENTRY
91483.251 JOX304 270E MAINROAD
91873.920 THX138 120E MAINROAD
91874.493 JOX304 280E EXIT
.
.
91982.102 THX138 290E EXIT
92301.302 THX138 300E ENTRY
92371.302 THX138 310E EXIT
.
.
1000.000 TST002 270W ENTRY
1275.000 TST002 260W EXIT
 
In this case, the driver of TST002 drove 10 km in 275 seconds. We can calculate
that this driver drove an average speed of ~130.91km/hr over this segment:
 
10 km * 3600 sec/hr
------------------- = 130.91 km/hr
      275 sec
 
Note that:
* A license plate may have multiple journeys in one file, and if they drive at unsafe speeds in both journeys, both should be counted.
* We do not mark speeding if they are not on the highway (i.e. for any driving between an EXIT and ENTRY event).
* Speeding is only marked once per journey. For example, if there are 4 segments 120km/h or greater, or multiple segments 130km/h or greater, the journey is only counted once.
 
3-1) Write a function catchSpeeders in LogFile that returns a collection of license plates that drove at unsafe speeds during a journey in the LogFile.
     If the same license plate drives at unsafe speeds during two different journeys, the license plate should appear twice (once for each journey they drove at unsafe speeds).
*/
class LogEntry {
  /**
   * Represents an entry from a single log line.
   * 
   * Log lines look like this in the file:
   * 34400.409 SXY288 210E ENTRY
   * 
   * Where:
   * -> 34400.409 is the timestamp in seconds since the software was started.
   * -> SXY288 is the license plate of the vehicle passing through the toll booth.
   * -> 210E is the location and traffic direction of the toll booth. Here, the
   *      toll booth is at 210 kilometers from the start of the tollway, and the E
   *      indicates that the toll booth was on the east-bound traffic side.
   *      Tollbooths are placed every ten kilometers.
   * -> ENTRY indicates which type of toll booth the vehicle went through. This is
   *      one of "ENTRY", "EXIT", or "MAINROAD".
   */
  constructor(logLine) {
    // REVIEW IMPROVEMENT: trim().split(/\s+/) tolerates repeated spaces and tabs.
    const tokens = logLine.split(' ');
    // REVIEW CORRECT: This copy already converts fractional timestamps to Number.
    this.timestamp = Number(tokens[0]);
    this.license_plate = tokens[1];
    this.booth_type = tokens[3];
    this.location = parseInt(tokens[2].slice(0, -1));
    const directionLetter = tokens[2].slice(-1);
    if (directionLetter === 'E') {
      this.direction = 'EAST';
    } else if (directionLetter === 'W') {
      this.direction = 'WEST';
    } else {
      throw new Error('Invalid direction letter');
    }
  }
 
  toString() {
    return `<LogEntry timestamp: ${this.timestamp} license: ${this.license_plate} location: ${this.location} direction: ${this.direction} booth type: ${this.booth_type}>`;
  }
}
 
class LogFile {
  /**
   * Represents a file containing a number of log lines, converted to LogEntry objects.
   */
  constructor(fileContents) {
    this.logEntries = [];
    const lines = fileContents.split('\n');
    for (const line of lines) {
      if (line.trim()) {
        const logEntry = new LogEntry(line.trim());
        this.logEntries.push(logEntry);
      }
    }
  }
 
  get length() {
    return this.logEntries.length;
  }
 
  item(index) {
    return this.logEntries[index];
  }
  countJourneys(){
    // REVIEW CORRECT: Counting EXIT events works under the stated complete-log assumption.
    return this.logEntries.filter(e=>e.booth_type==='EXIT').length;
  }
}
 
const testMethods = {
  // These tests are not meant to be exhaustive, and primarily show usage.
  testLogFile: () => {
    const logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_small.log", "utf-8"));
    assert(logFile.length === 13);
    for (const entry of logFile.logEntries) {
      assert(entry instanceof LogEntry);
    }
  },
  testLogEntry: () => {
    let logLine = '44776.619 KTB918 310E MAINROAD';
    let logEntry = new LogEntry(logLine);
    assert(logEntry.timestamp === 44776.619);
    assert(logEntry.license_plate === 'KTB918');
    assert(logEntry.location === 310);
    assert(logEntry.direction === 'EAST');
    assert(logEntry.booth_type === 'MAINROAD');
 
    logLine = '52160.132 ABC123 400W ENTRY';
    logEntry = new LogEntry(logLine);
    assert(logEntry.timestamp === 52160.132);
    assert(logEntry.license_plate === 'ABC123');
    assert(logEntry.location === 400);
    assert(logEntry.direction === 'WEST');
    assert(logEntry.booth_type === 'ENTRY');
  },
    testCountJourneys: () => {
      let logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_small.log", "utf-8"));
      assert.strictEqual(logFile.countJourneys(), 3);
    
      logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_medium.log", "utf-8"));
      assert.strictEqual(logFile.countJourneys(), 63);
  },
    // REVIEW MISSING: Implement LogFile.catchSpeeders for these tests; count each unsafe journey only once.
    testCatchSpeeders: () => {
      let logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_speeders.log", "utf-8"));
      let ticketList = logFile.catchSpeeders();
      // ticketList should be a list similar to
      // ["TST002", "TST003", "TST003"]
      // In this case, TST002 had one journey with unsafe driving, and
      // TST003 had two journeys with unsafe driving. The license plates
      // may be in any order.
      assert(ticketList.filter((ticket) => ticket === "TST002").length === 1);
      assert(ticketList.filter((ticket) => ticket === "TST003").length === 2);
      assert((new Set(ticketList)).size === 2);
 
      logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_medium.log", "utf-8"));
      ticketList = logFile.catchSpeeders();
      assert(ticketList.length === 10);
 
      logFile = new LogFile(fs.readFileSync("/content/test/tollbooth_long.log", "utf-8"));
      ticketList = logFile.catchSpeeders();
      assert(ticketList.length === 129);
  },
}
 
// run all tests
Object.getOwnPropertyNames(testMethods).forEach((func) => {
  try {
    console.log(`Running ${func}`);
    testMethods[func]();
    console.log('OK');
  } catch (e) {
    console.log('FAIL');
    console.log(e);
  }
  console.log('');
});
```

</details>

#### Problems in this snippet

- This copy already converts timestamps with Number and correctly counts EXIT events under its complete-log assumption.
- catchSpeeders is missing. Return one plate entry per unsafe journey and allow repeated plates across journeys.
- The original log-file fixtures are not supplied.

#### Corrected answer and explanation

##### F. Tollbooth parsing, completed journeys and speeding

**Sources:** F7, F12, F22, F26, F27.

###### Errors and differences between rows

- F7/F26 describe a string-versus-number timestamp bug. Convert with `Number`, not parseInt, because timestamps include fractions.
- F12/F22/F27 **already use `Number(tokens[0])`**. Do not add a nonexistent conversion fix to those copies.
- `split(' ')` is fragile with repeated whitespace; use trim/split(/\s+/).
- F12 leaves a standalone empty `countJourneys(logs)` function, while tests call `logFile.countJourneys()`. Implement the method on LogFile.
- F22/F27 already count EXIT events correctly under the explicit complete-log assumption. Their missing task is catchSpeeders.
- F12 contains copied unmatched/nested comment delimiters. Clean the wrapper before running it.
- Test log files under `/content/test/...` are not included in the workbook; the original file-based totals cannot be independently rerun without those fixtures.

###### Corrected classes

```js
class LogEntry {
  constructor(logLine) {
    const tokens = logLine.trim().split(/\s+/);
    if (tokens.length !== 4) throw new Error("Expected four log fields");
    const [timestamp, plate, locationDirection, type] = tokens;
    const match = /^(\d+)([EW])$/.exec(locationDirection);
    if (!match) throw new Error("Invalid location/direction");
    if (!["ENTRY", "EXIT", "MAINROAD"].includes(type)) throw new Error("Invalid booth type");
    this.timestamp = Number(timestamp);
    if (!Number.isFinite(this.timestamp)) throw new Error("Invalid timestamp");
    this.license_plate = plate;
    this.location = Number(match[1]);
    this.direction = match[2] === "E" ? "EAST" : "WEST";
    this.booth_type = type;
  }
  toString() {
    return `<LogEntry timestamp: ${this.timestamp} license: ${this.license_plate} location: ${this.location} direction: ${this.direction} booth type: ${this.booth_type}>`;
  }
}

class LogFile {
  constructor(contents) {
    this.logEntries = contents.split(/\r?\n/).filter((line) => line.trim())
      .map((line) => new LogEntry(line));
  }
  get length() { return this.logEntries.length; }
  item(index) { return this.logEntries[index]; }

  countJourneys() {
    // The question guarantees complete journeys and no missing entries.
    return this.logEntries.reduce((count, entry) =>
      count + (entry.booth_type === "EXIT" ? 1 : 0), 0);
  }

  catchSpeeders() {
    const byPlate = new Map();
    for (const entry of this.logEntries) {
      if (!byPlate.has(entry.license_plate)) byPlate.set(entry.license_plate, []);
      byPlate.get(entry.license_plate).push(entry);
    }
    const tickets = [];
    for (const [plate, entries] of byPlate) {
      entries.sort((a, b) => a.timestamp - b.timestamp);
      let journey = null;
      for (const entry of entries) {
        if (entry.booth_type === "ENTRY") {
          journey = { previous: entry, segments120: 0, unsafe: false };
          continue;
        }
        if (!journey) continue; // Ignore driving outside the highway.
        const previous = journey.previous;
        const seconds = entry.timestamp - previous.timestamp;
        const distance = Math.abs(entry.location - previous.location);
        if (seconds <= 0 || entry.direction !== previous.direction) {
          throw new Error("Invalid journey sequence");
        }
        // Individual 10km speed cannot be inferred from a gap of multiple booths.
        if (distance !== 10) throw new Error("Expected consecutive 10km booth records");
        const speed = distance * 3600 / seconds;
        if (speed >= 130) journey.unsafe = true;
        if (speed >= 120) journey.segments120++;
        if (journey.segments120 >= 2) journey.unsafe = true;
        journey.previous = entry;

        if (entry.booth_type === "EXIT") {
          if (journey.unsafe) tickets.push(plate);
          journey = null;
        }
      }
    }
    return tickets;
  }
}
```

**Explanation:** A journey is ENTRY through EXIT; MAINROAD events do not start or end it. Calculate km/h as distance * 3600 / elapsed seconds. Use absolute distance for westbound journeys. Flag either one segment >=130 or any two segments >=120 (not necessarily adjacent). Append at most one ticket per journey, but allow the same plate again for a different journey. Sorting per vehicle supports interleaved logs; it is O(L log L) overall, or O(L) processing if per-vehicle chronological order is already guaranteed. Complete 10km sensor records are assumed; gaps do not prove individual-segment speeds.

###### Different task in F7/F26: count cars, not journeys

Those shortened reports ask for cars with at least one entry and exit. That counts a car once, even if it made two trips. Do not confuse it with F12/F22/F27, which explicitly count trips.

```js
function countCarsWithEntryAndExit(entries) {
  const flags = new Map();
  for (const entry of entries) {
    const plate = entry.license_plate;
    if (!flags.has(plate)) flags.set(plate, { entry: false, exit: false });
    const state = flags.get(plate);
    const type = entry.booth_type.toUpperCase();
    if (type === "ENTRY") state.entry = true;
    if (type === "EXIT") state.exit = true;
  }
  return [...flags.values()].filter((value) => value.entry && value.exit).length;
}
```

This matches the simplified “has both event types” statement; for actually paired valid trips use an ENTRY/EXIT state machine. Clarify which result is required.

## Javascript - BE!F28

### Question 1 in this cell

Debug the MySQL/string-processing code, correct reverseWord, improve readability/data access, and explain test cases.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```text
Introduction - 1 Minute

Section -1 (Existing Code Review and Refactor)
A Code block with a function to fetch a string from database, a function to reverse a sentence and a function to reverse words was given. 
Q1: Explain the code in detail with maximum details
Q2: What would you do to improve the readability and maintainabilty
Q3: What are the data access ineffiency that you are observing in the code
Q4: What are the security flaws that you are seeing in the code and how woud you fix it
```

</details>

#### Problems in this snippet

- This row describes the database/string review without including its actual functions.
- Use the F15 correction for the supplied reverseWord implementation; unshown SQL injection or repeated queries cannot be asserted as proven defects.

#### Corrected answer and explanation

##### H. MySQL access, reverseWord and reverseSentence

**Sources:** F15; descriptions/reference requests in F21, F25, F28.

###### Exact bug

```js
// Wrong: index word.length is out of bounds.
for (let i = word.length; i >= 0; i--) {
  reversed += word[i];
}

// Correct:
for (let i = word.length - 1; i >= 0; i--) {
  reversed += word[i];
}
```

For `abc`, the wrong loop appends undefined before c,b,a. The workbook's suggested `word.length =1` is itself a typo: the correction is **minus one**, not assignment. The initial `/ 1. Function...` is also invalid JavaScript if copied literally; use `//`.

###### Corrected string functions

```js
function reverseWord(word) {
  if (typeof word !== "string") throw new TypeError("Expected a string");
  const characters = Array.from(word);
  const result = [];
  for (let i = characters.length - 1; i >= 0; i--) result.push(characters[i]);
  return result.join("");
}

function reverseSentence(sentence) {
  if (typeof sentence !== "string") throw new TypeError("Expected a string");
  // Preserve repeated ASCII spaces like the supplied manual split.
  return sentence.split(" ").map(reverseWord).reverse().join(" ");
}
```

**Explanation:** Reverse letters in each word, then reverse word order, as the source requests. `Hello world` becomes `dlrow olleH`. Reversing only word order would instead give `world Hello` and would not satisfy this source. Array.from handles Unicode code points, not every grapheme cluster; ask about combined characters if relevant.

###### Database code: what can and cannot be concluded

The supplied `connectToMySQL` returns a connection before its asynchronous callback completes and only logs connection failures. That timing is not automatically a bug with a driver that queues queries, but it makes readiness/failure hard for callers to handle. The `mysql` import is not shown. Query text and fetch-string code are absent, so SQL injection cannot be proved from the snippet alone.

For one connection, return a promise-based connection and let the caller catch failures. For a long-running backend, reuse a pool instead of opening one connection for every sentence. Keep credentials in configuration and use bound SQL parameters. The following is an illustrative mysql2 implementation; table/column names are assumed, not provided by the workbook.

```js
// Database module: requires mysql2 in the actual project.
// import mysql from "mysql2/promise";
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
// });

function makeReadAndReverseSentence(pool) {
  return async function readAndReverseSentence(id) {
    if (!Number.isSafeInteger(id) || id <= 0) throw new TypeError("Invalid sentence ID");
    const [rows] = await pool.execute(
      "SELECT content FROM sentences WHERE id = ? LIMIT 1", [id]
    );
    if (!rows.length) return null;
    return reverseSentence(rows[0].content);
  };
}
```

**Tests:** empty string, one letter, spaces, multiple words, repeated spaces, punctuation, non-string input, non-BMP character, database missing row/failure, and invalid ID. Mock the pool to verify query parameters without exposing credentials. A live database integration test is separate.

### Question 2 in this cell

Fix paid gym membership counts and implement addWorkout and getAverageWorkoutDurations.

<details open>
<summary>Original question and supplied code with simple error comments</summary>

```js
"use strict";
/*
We are building a program to manage a gym's membership. The gym has multiple members, each with a unique ID, name, and membership status. The program allows gym staff to add new members, update members status, and get membership statistics.

Definitions:
* A "member" is an object that represents a gym member. It has properties for the ID, name, and membership status.
* A "membership" is a class which is used for managing members in the gym.

To begin with, we present you with two tasks:
1-1) Read through and understand the code below. Please take as much time as necessary, and feel free to run the code.
1-2) The test for Membership is not passing due to a bug in the code. Make the necessary changes to Membership to fix the bug.

We are currently updating our system to include information about workouts for our members. As part of this update, we have introduced the Workout class, which represents a single workout session for a member. Each object of the Workout class has a unique ID, as well as a start time and end time that are represented in the number of minutes spent from the start of the day. You can assume that all the Workouts are from the same day.

To implement these changes, we need to add two functions to the Membership class:

2.1) The `addWorkout` function should be used to add a workout session for a member. If the given member does not exist while calling this function, the workout can be ignored.

2.2) The `getAverageWorkoutDurations` function should calculate the average duration of workouts for each member in minutes and return the results as a map.

To assist you in testing these new functions, we have provided the testGetAverageWorkoutDurations function.
*/

const assert = require("assert");

class MembershipStatus {
  /*
  Membership Status is of three types: BRONZE, SILVER and GOLD.
  BRONZE is the default membership a new member gets.
  SILVER and GOLD are paid memberships for the gym.
  */
  static BRONZE = 1;
  static SILVER = 2;
  static GOLD = 3;
}

class Workout {
  /*
  This class represents a single workout session for a member.
  Each object of the Workout class has a unique ID, as well as 
  a start time and end time that are represented in the number 
  of minutes spent from the start of the day.
  */
  constructor(id, startTime, endTime) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  getDuration() {
    return this.endTime - this.startTime;
  }
}

class Member {
  /* Data about a gym member. */
    constructor(memberId, name, membershipStatus) {
    this.memberId = memberId;
    this.name = name;
    this.membershipStatus = membershipStatus;
  }

  isEqual(other) {
    if (!(other instanceof Member)) {
      return false;
    }
    return (
      this.memberId === other.memberId &&
      this.name === other.name &&
      this.membershipStatus === other.membershipStatus
    );
  }

  toString() {
    return `Member ID: ${this.memberId}, Name: ${this.name}, Membership Status: ${this.membershipStatus}`;
  }
}

class Membership {
  /*
  Data for managing a gym membership, and methods which staff can
  use to perform any queries or updates.
  */
    constructor() {
    this.members = [];
  }

  addMember(member) {
    /* Adds a member to the gym */
    this.members.push(member);
  }

  updateMembership(memberId, membershipStatus) {
    /* Update membership of the given member */
    for (const member of this.members) {
      if (member.memberId === memberId) {
        member.membershipStatus = membershipStatus;
        break;
      }
    }
  }
  
  getMembershipStatistics() {
    /* Calculates and returns membership statistics for all members */
    
    const totalMembers = this.members.length;
    const totalPaidMembers = this.members.filter(
      (member) =>
        member.membershipStatus === MembershipStatus.GOLD || member.membershipStatus === MembershipStatus.SILVER
    ).length;
    // REVIEW CHECK: For zero members, this divides 0 by 0; define the empty result.
    const conversionRate = (totalPaidMembers / totalMembers) * 100;

    return {
      totalMembers,
      totalPaidMembers,
      conversionRate,
    };
  }

  // REVIEW MISSING: Store workouts by member ID and ignore unknown members.
  addWorkout(memberId, workOut) {
     // implement the logic this is question 1
  }

  // REVIEW MISSING: Calculate each member’s own average and return a Map.
  getAverageWorkoutDurations() {
    // implement the logic this is question 2
  }

}

const testMethods = {
    testMember: () => {
    const testMember = new Member(1, "John Doe", MembershipStatus.BRONZE);
    assert.strictEqual(testMember.memberId, 1);
    assert.strictEqual(testMember.name, "John Doe");
    assert.strictEqual(testMember.membershipStatus, MembershipStatus.BRONZE);
  },
  testMembership: () => {
    const testMembership = new Membership();
    const testMember = new Member(1, "John Doe", MembershipStatus.BRONZE);
    testMembership.addMember(testMember);
    assert.strictEqual(testMembership.members.length, 1);
    assert.ok(testMembership.members[0].isEqual(testMember));

    testMembership.updateMembership(1, MembershipStatus.SILVER);
    assert.strictEqual(
      testMembership.members[0].membershipStatus,
      MembershipStatus.SILVER
    );

    const testMember2 = new Member(2, "Alex C", MembershipStatus.BRONZE);
    testMembership.addMember(testMember2);

    const testMember3 = new Member(3, "Marie C", MembershipStatus.GOLD);
    testMembership.addMember(testMember3);

    const testMember4 = new Member(4, "Joe D", MembershipStatus.SILVER);
    testMembership.addMember(testMember4);

    const testMember5 = new Member(5, "June R", MembershipStatus.BRONZE);
    testMembership.addMember(testMember5);

    const testMember6 = new Member(6, "Westley D", MembershipStatus.SILVER);
    testMembership.addMember(testMember6);

    const attendanceStats = testMembership.getMembershipStatistics();
    assert.strictEqual(attendanceStats.totalMembers, 6);
    assert.strictEqual(attendanceStats.totalPaidMembers, 4);
    assert.ok(Math.abs(attendanceStats.conversionRate - 66.67) < 0.1);
  },
  
  testGetAverageWorkoutDurations() {
    const testMembership = new Membership();
    const testMember = new Member(12, "John Doe", MembershipStatus.SILVER);
    testMembership.addMember(testMember);

    const testMember2 = new Member(22, "Alex Cleeve", MembershipStatus.BRONZE);
    testMembership.addMember(testMember2);

    const testMember3 = new Member(31, "Marie Cardiff", MembershipStatus.GOLD);
    testMembership.addMember(testMember3);

    const testMember4 = new Member(37, "George Costanza", MembershipStatus.SILVER);
    testMembership.addMember(testMember4);

    const testWorkout1 = new Workout(11, 10, 20);
    const testWorkout2 = new Workout(24, 15, 35);
    const testWorkout3 = new Workout(32, 45, 90);
    const testWorkout4 = new Workout(47, 100, 155);
    const testWorkout5 = new Workout(56, 120, 200);
    const testWorkout6 = new Workout(62, 300, 400);
    const testWorkout7 = new Workout(78, 1000, 1010);
    const testWorkout8 = new Workout(80, 1010, 1045);

    testMembership.addWorkout(12, testWorkout1);
    testMembership.addWorkout(22, testWorkout2);
    testMembership.addWorkout(31, testWorkout3);
    testMembership.addWorkout(12, testWorkout4);
    testMembership.addWorkout(22, testWorkout5);
    testMembership.addWorkout(31, testWorkout6);
    testMembership.addWorkout(12, testWorkout7);
    testMembership.addWorkout(4, testWorkout8);

    const averageDurations = testMembership.getAverageWorkoutDurations();
    assert.ok(Math.abs(averageDurations.get(12) - 25.0) < 0.1);
    assert.ok(Math.abs(averageDurations.get(22) - 50.0) < 0.1);
    assert.ok(Math.abs(averageDurations.get(31) - 72.5) < 0.1);
    assert.ok(!averageDurations.has(4));
  },
}


// run all tests
Object.getOwnPropertyNames(testMethods).forEach((func) => {
  try {
    console.log(`Running ${func}`);
    testMethods[func]();
    console.log('OK');
  } catch (e) {
    console.log('FAIL');
    console.log(e);
  }
  console.log('');
});
```

</details>

#### Problems in this snippet

- The paid-member check already includes GOLD and SILVER.
- addWorkout and getAverageWorkoutDurations are empty placeholders; workout storage is missing.
- For an empty gym, conversionRate currently divides zero by zero.
- This version’s 45-minute session produces a 72.5-minute average for member31; the F16/F17 data produces 70.

#### Corrected answer and explanation

##### I. Gym membership statistics and average workout durations

**Sources:** F8/F9 describe the issue; F16/F17 contain one version; F28 contains another version; F21 references the gym task.

###### Errors and differences

- F16/F17 only count SILVER as paid; GOLD must count too.
- F28 **already checks SILVER or GOLD**, so that fix is not missing there.
- Dividing by zero for an empty gym produces NaN; choose a documented empty conversion rate. This answer uses 0%.
- F16/F17 omit addWorkout/getAverageWorkoutDurations. F28 includes empty placeholders and has no workouts storage.
- A standalone `Coding Question 2:` line outside a comment is invalid source if copied literally.
- Do not use `status !== BRONZE` as the only paid check unless the status domain is validated; unknown values would accidentally count as paid.

###### Corrected complete classes

```js
class MembershipStatus {
  static BRONZE = 1;
  static SILVER = 2;
  static GOLD = 3;
}

class Member {
  constructor(memberId, name, membershipStatus = MembershipStatus.BRONZE) {
    this.memberId = memberId;
    this.name = name;
    this.membershipStatus = membershipStatus;
  }
  isEqual(other) {
    return other instanceof Member && this.memberId === other.memberId &&
      this.name === other.name && this.membershipStatus === other.membershipStatus;
  }
  toString() {
    return `Member ID: ${this.memberId}, Name: ${this.name}, Membership Status: ${this.membershipStatus}`;
  }
}

class Workout {
  constructor(id, startTime, endTime) {
    if (!Number.isFinite(startTime) || !Number.isFinite(endTime) ||
        startTime < 0 || endTime > 1440 || endTime < startTime) {
      throw new RangeError("Invalid same-day workout times");
    }
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }
  getDuration() { return this.endTime - this.startTime; }
}

class Membership {
  constructor(members = []) {
    this.members = [];
    this.memberById = new Map();
    this.workouts = new Map();
    for (const member of members) this.addMember(member);
  }
  addMember(member) {
    if (this.memberById.has(member.memberId)) throw new Error("Duplicate member ID");
    this.members.push(member);
    this.memberById.set(member.memberId, member);
  }
  updateMembership(memberId, status) {
    if (![MembershipStatus.BRONZE, MembershipStatus.SILVER, MembershipStatus.GOLD].includes(status)) {
      throw new Error("Invalid membership status");
    }
    const member = this.memberById.get(memberId);
    if (member) member.membershipStatus = status;
  }
  getMembershipStatistics() {
    const totalMembers = this.members.length;
    const totalPaidMembers = this.members.filter((member) =>
      member.membershipStatus === MembershipStatus.SILVER ||
      member.membershipStatus === MembershipStatus.GOLD
    ).length;
    const conversionRate = totalMembers ? totalPaidMembers / totalMembers * 100 : 0;
    return { totalMembers, totalPaidMembers, conversionRate };
  }
  addWorkout(memberId, workout) {
    if (!this.memberById.has(memberId)) return;
    if (!this.workouts.has(memberId)) this.workouts.set(memberId, []);
    this.workouts.get(memberId).push(workout);
  }
  getAverageWorkoutDurations() {
    const averages = new Map();
    for (const [memberId, workouts] of this.workouts) {
      const total = workouts.reduce((sum, workout) => sum + workout.getDuration(), 0);
      averages.set(memberId, total / workouts.length);
    }
    return averages;
  }
}
```

**Explanation:** Store workouts by member ID. Ignore unknown members as requested. Average each member's own sessions; do not divide by total members. Members without sessions are omitted from the returned Map, a policy consistent with the supplied checks. Input workout IDs are assumed unique as stated; repeated-submission policy is unspecified.

F16/F17 expected averages: ID12=25, ID22=50, ID31=70. F28 changes one session from 40 to 45 minutes, so ID31 is **72.5**, not 70. Unknown member ID4 must be absent. The fifth/sixth member variations change paid conversion from 60% to about 66.67%; do not hardcode either answer. Statistics O(M), workout insertion average O(1), averages O(W), storage O(M+W).

## Verification

The corrected code is unchanged from the previously checked backend solutions: original stock tests passed for F10/F13/F14/F19 and gym tests passed for F16/F17/F28. Additional pure-function, teleporter, journey/speeding and mocked-handler checks passed. The original source annotations are for review, not runnable replacements. Live APIs, MySQL, browser interaction and absent tollbooth file fixtures remain unverified. The Excel workbook and practice code were not changed.
