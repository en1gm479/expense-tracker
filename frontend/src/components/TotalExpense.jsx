import React, { useState } from "react";

const TotalExpenses = ({ expenses }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [total, setTotal] = useState(null);
  const [error, setError] = useState("");

  const calculateTotal = async () => {
    if (!start || !end) {
      setError("Both start and end dates are required.");
      return;
    }

    if (new Date(start) > new Date(end)) {
      setError("Start date cannot be after the end date.");
      return;
    }

    setError("");

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/api/expenses/total?start=${start}&end=${end}`);
      if (!response.ok) {
        throw new Error("Failed to fetch total expenses");
      }
      const data = await response.json();
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching total expenses:", error);
      setTotal(null);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Total Expenses</h2>
      <div className="flex gap-3">
        <input
          type="date"
          className="p-2 border rounded flex-1"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="date"
          className="p-2 border rounded flex-1"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={calculateTotal}
        className={`mt-3 w-full p-2 rounded ${
          !start || !end ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"
        }`}
        disabled={!start || !end}
      >
        Get Total
      </button>

      {total !== null && <h3 className="mt-2 text-lg font-bold">Total: ₹{total}</h3>}
    </div>
  );
};

export default TotalExpenses;
