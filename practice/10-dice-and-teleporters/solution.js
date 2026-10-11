export function possibleSquares(teleporters, dieSides, start, lastSquare) {
  const jumps = new Map(teleporters.map(t => t.split(',').map(Number)));
  const destinations = new Set();
  for (let roll=1; roll<=dieSides; roll++) {
    const landing = start+roll;
    if (landing > lastSquare) continue;
    destinations.add(jumps.has(landing) ? jumps.get(landing) : landing);
  }
  return [...destinations].sort((a,b) => a-b);
}
