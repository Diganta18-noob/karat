export function grouping(events, N) {
  const neighbors = new Map();
  for (const [type,a,b] of events) {
    if (!['CONNECT','DISCONNECT'].includes(type)) throw new Error('Unknown event');
    if (a === b) throw new Error('Self-connection');
    if (!neighbors.has(a)) neighbors.set(a,new Set());
    if (!neighbors.has(b)) neighbors.set(b,new Set());
    if (type === 'CONNECT') {neighbors.get(a).add(b); neighbors.get(b).add(a);}
    else {neighbors.get(a).delete(b); neighbors.get(b).delete(a);}
  }
  const below=[], atLeast=[];
  for (const [user,connections] of neighbors) (connections.size < N ? below : atLeast).push(user);
  return [below,atLeast];
}
