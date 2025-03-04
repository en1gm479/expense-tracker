import { applescript } from "globals";
import React, { useState } from "react";

const FilterExpenses = ({ setFilteredExpenses, expenses }) => {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleFilter = async () => {
    // console.log(expenses)
    if (!category && !date) {
      setError("Please enter at least one filter criteria.");
      return;
    }

    setError("");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    let url = `${API_BASE_URL}/api/expenses`;
    if (category) url += `?category=${category}&`;
    if (date) url += `date=${date}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch filtered expenses.");
      }
      const data = await response.json();
      setFilteredExpenses(data);
    } catch (error) {
      console.error("Error fetching filtered expenses:", error);
      setError("Error fetching expenses. Please try again.");
    }
  };

  const handleReset = () => {
    setCategory("");
    setDate("");
    setError("");
    setFilteredExpenses(expenses);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Filter Expenses</h2>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Category"
          className="p-2 border rounded flex-1"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="date"
          className="p-2 border rounded flex-1"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex gap-2 mt-3">

      <button
        onClick={handleFilter}
        className={`mt-3 w-full p-2 rounded ${
          !category && !date ? "bg-gray-400 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-800 text-white"
        }`}
        disabled={!category && !date}
      >
        Apply Filter
      </button>
      <button
          onClick={handleReset}
          className="mt-3 w-full p-2 flex-1 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Reset
        </button>
      </div>

    </div>
  );
};

export default FilterExpenses;
