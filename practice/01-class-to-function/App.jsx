import { useEffect, useState } from "react";
import Original from "./Original.jsx";
export default function App() {
  const [step, setStep] = useState(1);
  return (
    <>
      <label>
        Step{" "}
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </label>
      <h2>Original class component</h2>
      <Original step={step} />
      <h2>Your function component</h2>
      <Counter step={step} />
    </>
  );
}
function Counter({ step }) {
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(()=>{
    if (paused) return;
    const timer = setInterval (()=>{
      setCount((previous)=> previous + step);
    },1000);

    return ()=> clearInterval(timer);
  },[step,paused])

  useEffect(()=>{
    document.title = `Count :${count}`;

  },[count]);


  return(
    <div>
      <p>Count : {count}</p>
      <button onClick={()=> setPaused((previous)=> !previous)}> {paused ? "Resume": "Pause "} </button>
    </div>
  )
}
