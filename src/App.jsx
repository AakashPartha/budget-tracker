import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import Chart from "./Chart";
import PieChartComponent from "./PieChart"; // Import Pie Chart component

export default function App() {
  const categories = ["Food", "Rent", "Entertainment", "Transportation", "Other"];

  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!description || !amount) return;

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
    };

    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
    setCategory(categories[0]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Calculate total balance
  const totalBalance = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">
          💰 Budget Tracker
        </h1>

        {/* Total Balance Display */}
        <div
          className={`text-center text-2xl font-bold p-3 rounded ${
            totalBalance >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          Balance: ${totalBalance.toFixed(2)}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Description"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none text-white"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <select
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={addTransaction}
          className="w-full p-3 bg-green-500 rounded hover:bg-green-600 transition duration-200"
        >
          Add Transaction
        </button>

        <motion.ul
          className="mt-4 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {transactions.map((t) => (
            <motion.li
              key={t.id}
              className="p-3 bg-gray-700 rounded shadow-md flex justify-between items-center"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span>{t.description} ({t.category})</span>
              <span className={t.amount >= 0 ? "text-green-400" : "text-red-400"}>
                ${t.amount.toFixed(2)}
              </span>
              <button
                onClick={() => deleteTransaction(t.id)}
                className="text-red-400 hover:text-red-600 transition duration-200 ml-3"
              >
                <FaTrash />
              </button>
            </motion.li>
          ))}
        </motion.ul>

        {/* Add the Income vs. Expenses Chart */}
        <Chart transactions={transactions} />

        {/* Add the Pie Chart */}
        <PieChartComponent transactions={transactions} />
      </div>
    </div>
  );
}
