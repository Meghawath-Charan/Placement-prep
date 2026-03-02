import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const increment = () => {
    setCount(prevCount => {
      const newValue = prevCount + 1;
      setHistory(prevHistory => [...prevHistory, newValue]);
      return newValue;
    });
  };

  const decrement = () => {
    setCount(prevCount => {
      const newValue = prevCount - 1;
      setHistory(prevHistory => [...prevHistory, newValue]);
      return newValue;
    });
  };

  return (
    <div>
      <h2>Smart Counter</h2>
      <h3>Count: {count}</h3>

      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>

      <h4>History:</h4>
      <ul>
        {history.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

export default Counter;