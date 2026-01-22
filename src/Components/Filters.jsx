import { useState } from "react";

export default function Filters({ onFilter }) {
  const [category, setCategory] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const applyFilters = () => {
    onFilter({ category, from, to });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800">Filters</h3>

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input"
      />

      <input
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="input"
      />

      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="input"
      />

      <button onClick={applyFilters} className="btn-primary w-full">
        Apply Filters
      </button>
    </div>
  );
}
