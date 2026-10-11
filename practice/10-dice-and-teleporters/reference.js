process.env.PRACTICE_SOLUTION = '1';
await import(process.argv.includes('--test') ? './answer.test.js' : './run.js');
