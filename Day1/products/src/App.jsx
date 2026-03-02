import "./App.css";
import Product from "./components/Product";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div className="page">
      <h1>Day 1 Tasks</h1>
      <p>Products and User Dashboard task implementation.</p>

      <section className="section">
        <h2>Product Cards</h2>
        <Product />
      </section>

      <section className="section">
        <h2>User Dashboard</h2>
        <UserDetails />
      </section>
    </div>
  );
}

export default App;
