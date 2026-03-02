import { useState } from "react";

function LiveSearch() {
  const [search, setSearch] = useState("");

  const items = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Grapes",
    "Pineapple",
    "Strawberry",
    "Watermelon",
    "Papaya",
    "Kiwi"
  ];

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Live Search Filter</h2>

      <input
        type="text"
        placeholder="Search fruits..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
}

export default LiveSearch;