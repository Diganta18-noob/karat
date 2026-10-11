import {test} from 'node:test';
import assert from 'node:assert/strict';
const {possibleSquares} = await import(process.env.PRACTICE_SOLUTION === '1' ? './solution.js' : './answer.js');
test('ordinary die outcomes', () => assert.deepEqual(possibleSquares([],3,0,10),[1,2,3]));
test('teleport once, never chain', () => assert.deepEqual(possibleSquares(['1,3','3,8'],1,0,10),[3]));
test('duplicate destinations', () => assert.deepEqual(possibleSquares(['1,5','2,5'],3,0,10),[3,5]));
test('overshoots ignored', () => assert.deepEqual(possibleSquares([],6,9,10),[10]));
test('last square has no next move', () => assert.deepEqual(possibleSquares([],6,10,10),[]));
test('backward and zero destinations', () => assert.deepEqual(possibleSquares(['3,1','4,0','5,10'],3,2,10),[0,1,10]));
