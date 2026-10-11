export function reflowAndJustify(lines, maxWidth) {
  if (!Number.isInteger(maxWidth) || maxWidth < 1) throw new Error('Width must be a positive integer');
  const words = lines.join(' ').trim().split(/\s+/).filter(Boolean);
  if (words.some(w => w.length > maxWidth)) throw new Error('Word longer than width');
  const output = [];
  let index = 0;
  while (index < words.length) {
    const row = [];
    let letters = 0;
    while (index < words.length && letters + words[index].length + row.length <= maxWidth) {
      const word = words[index++]; row.push(word); letters += word.length;
    }
    if (row.length === 1) {output.push(row[0]); continue;}
    const gaps = row.length-1;
    const total = maxWidth-letters;
    const base = Math.floor(total/gaps), extra = total%gaps;
    output.push(row.map((word,i) => word + (i < gaps ? '-'.repeat(base+(i<extra ? 1:0)) : '')).join(''));
  }
  return output;
}
