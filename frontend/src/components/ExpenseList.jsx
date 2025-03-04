import React from "react";

const ExpenseList = ({ expenses }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-gray-700">Expense List</h2>
      {expenses.length > 0 ? (
        <ul className="border rounded-md p-3 bg-gray-50 divide-y divide-gray-300">
          {expenses.map((expense, index) => (
            <li
              key={expense._id}
              className={`p-3 flex justify-between items-center ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div>
                <span className="font-bold text-gray-700">
                  {new Date(expense.date)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")}
                </span>{" "}
                -<span className="text-gray-600"> {expense.category}</span>
                <div className="text-gray-500">{expense.description}</div>
              </div>
              <span className="text-green-600 font-bold">
                ₹{expense.amount}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No expenses found.</p>
      )}
    </div>
  );
};

export default ExpenseList;
