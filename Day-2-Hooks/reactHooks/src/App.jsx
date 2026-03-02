import Counter from "./components/Task1/Counter";
import Users from "./components/Task2/Users";
import LiveSearch from "./components/Task3/LiveSearch";

function App() {
  return (
    <div className="page">
      <h1>Day 2 - React Hooks Tasks</h1>

      <section className="section">
        <h2>Task 1: Smart Counter with History</h2>
        <Counter />
      </section>

      <section className="section">
        <h2>Task 2: API Data Fetch with Loading and Error</h2>
        <Users />
      </section>

      <section className="section">
        <h2>Task 3: Live Search Filter</h2>
        <LiveSearch />
      </section>
    </div>
  );
}

export default App;
