import { useMemo, useState } from "react";

const ITEMS = [
  "React",
  "Redux",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "Bootstrap",
  "Vite",
  "Next.js",
];

function LiveSearch() {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return ITEMS;

    return ITEMS.filter((item) => item.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search technologies..."
      />

      {filteredItems.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {filteredItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LiveSearch;
