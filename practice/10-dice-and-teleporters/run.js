const {possibleSquares} = await import(process.env.PRACTICE_SOLUTION === '1' ? './solution.js' : './answer.js');
console.log(possibleSquares(['3,1','4,2','5,10'],6,0,10));
