import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);

  const increment = () => {
    setCount((prevCount) => {
      const nextValue = prevCount + 1;
      setHistory((prevHistory) => [...prevHistory, nextValue]);
      return nextValue;
    });
  };

  const decrement = () => {
    setCount((prevCount) => {
      const nextValue = prevCount - 1;
      setHistory((prevHistory) => [...prevHistory, nextValue]);
      return nextValue;
    });
  };

  return (
    <div>
      <h3>Count: {count}</h3>
      <div className="row">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
      <h4>History</h4>
      <ul>
        {history.map((value, index) => (
          <li key={`${value}-${index}`}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

export default Counter;
