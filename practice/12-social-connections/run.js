import {events} from './examples.js';
const {grouping} = await import(process.env.PRACTICE_SOLUTION === '1' ? './solution.js' : './answer.js');
console.log(grouping(events,3));
