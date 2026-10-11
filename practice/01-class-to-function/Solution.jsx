import { useEffect, useState } from 'react';
function Counter({step}) {
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setCount(c => c + step), 1000);
    return () => clearInterval(timer);
  }, [step, paused]);
  useEffect(() => { document.title = `Count: ${count}`; }, [count]);
  return <><p>Count: {count}</p><button onClick={() => setPaused(p => !p)}>{paused ? 'Resume' : 'Pause'}</button></>;
}
export default function App() {
  const [step, setStep] = useState(1);
  const [visible, setVisible] = useState(true);
  return <><label>Step <input type="number" value={step} onChange={e => setStep(Number(e.target.value))}/></label>
    <button onClick={() => setVisible(v => !v)}>Mount / Unmount</button>{visible && <Counter step={step}/>}</>;
}
