import {useEffect, useState} from 'react';
import {requestProduct} from './mockApi.js';
function useFetch(id, mode, delay, retry) {
  const [state, setState] = useState({data:null, loading:true, error:''});
  useEffect(() => {
    // BUG: no reset, no catch, no cleanup, and failure falls through to success.
    (async () => {
      const response = await requestProduct(id, {mode, delay});
      if (!response.ok) setState({data:null, loading:false, error:'HTTP error'});
      const data = await response.json();
      setState({data, loading:false, error:''});
    })();
  }, [id, mode, delay, retry]);
  return state;
}
function ViewProduct(props) {
  const {data, loading, error} = useFetch(props.id, props.mode, props.delay, props.retry);
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  // TODO: display all requested fields safely.
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
export default function App() {
  const [id, setId] = useState(1);
  const [mode, setMode] = useState('ok');
  const [delay, setDelay] = useState(800);
  const [retry, setRetry] = useState(0);
  return <><label>Product <select value={id} onChange={e => setId(Number(e.target.value))}>{[1,2,3].map(i => <option key={i}>{i}</option>)}</select></label>
    <label>Response <select value={mode} onChange={e => setMode(e.target.value)}>{['ok','http-error','network-error'].map(m => <option key={m}>{m}</option>)}</select></label>
    <label>Delay ms <input type="number" min="0" value={delay} onChange={e => setDelay(Number(e.target.value))}/></label>
    <button onClick={() => setRetry(r => r+1)}>Retry</button><ViewProduct id={id} mode={mode} delay={delay} retry={retry}/></>;
}
