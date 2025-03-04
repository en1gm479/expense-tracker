import  { useState } from "react";
import React from "react";

const ExpenseForm = ({ addExpense }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      const newExpense = await response.json();
      addExpense(newExpense); 
      setFormData({ amount: "", category: "", date: "", description: "" }); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        className="p-2 border rounded w-full"
        onChange={handleChange}
        value={formData.amount}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        className="p-2 border rounded w-full"
        onChange={handleChange}
        value={formData.category}
        required
      />
      <input
        type="date"
        name="date"
        className="p-2 border rounded w-full"
        onChange={handleChange}
        value={formData.date}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        className="p-2 border rounded w-full"
        onChange={handleChange}
        value={formData.description}
      />

      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
