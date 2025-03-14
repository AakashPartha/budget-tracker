import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Chart({ transactions }) {
  // Summarize income and expenses
  const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);

  const data = [
    { name: "Income", amount: income },
    { name: "Expenses", amount: Math.abs(expenses) }
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4">
      <h2 className="text-lg font-bold text-center mb-2">Income vs. Expenses</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#4CAF50" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
