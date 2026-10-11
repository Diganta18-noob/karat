const {reflowAndJustify} = await import(process.env.PRACTICE_SOLUTION === '1' ? './solution.js' : './answer.js');
console.log(reflowAndJustify(['The day began as still as the','night abruptly lighted with','brilliant flame'],24));
