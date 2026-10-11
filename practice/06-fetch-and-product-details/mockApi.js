import {products} from './data.js';
export function requestProduct(id, {mode='ok', delay=800, signal}={}) {
  return new Promise((resolve,reject) => {
    const abort = () => {clearTimeout(timer); reject(new DOMException('Aborted','AbortError'));};
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort',abort);
      if (mode === 'network-error') {reject(new Error('Network disconnected')); return;}
      const product = products.find(p => p.id === id);
      const ok = mode !== 'http-error' && !!product;
      resolve({ok, status:ok ? 200 : 500, json:async () => ok ? product : {message:'Request failed'}});
    }, Math.max(0,delay));
    if (signal?.aborted) abort(); else signal?.addEventListener('abort',abort,{once:true});
  });
}
