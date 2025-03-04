import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import FilterExpenses from "./components/FilterExpense";
import TotalExpenses from "./components/TotalExpense";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/api/expenses`,{
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }
      const data = await response.json();
      setExpenses(data);
      setFilteredExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  useEffect(() => {
    
    fetchExpenses();
  }, []);


  const addExpense = async (newExpense) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });

      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">Expense Tracker</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-5 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add Expense</h2>
            <ExpenseForm addExpense={addExpense} />
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-gray-50 p-5 shadow-md rounded-lg">
              <TotalExpenses expenses={expenses} />
            </div>
            <div className="bg-gray-50 p-5 shadow-md rounded-lg">
              <FilterExpenses expenses={expenses} setFilteredExpenses={setFilteredExpenses} />
            </div>
            <div className="bg-gray-50 p-5 shadow-md rounded-lg">
              <ExpenseList expenses={filteredExpenses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
