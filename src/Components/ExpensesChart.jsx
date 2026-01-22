import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../Api/ExpenseApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ExpensesChart() {
  const { data } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  const expenses = Array.isArray(data) ? data : [];

  const totals = expenses.reduce((acc, e) => {
    const category = e.category || "Others";
    acc[category] = (acc[category] || 0) + Number(e.amount || 0);
    return acc;
  }, {});

  if (Object.keys(totals).length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        No expense data available to visualize
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Expenses by Category
      </h2>

      <Bar
        data={{
          labels: Object.keys(totals),
          datasets: [
            {
              label: "Total Amount",
              data: Object.values(totals),
              backgroundColor: "#6366f1",
              borderRadius: 8,
            },
          ],
        }}
        options={{
          responsive: true,
          animation: {
            duration: 800,
            easing: "easeOutQuart",
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: { display: false },
            },
            y: {
              beginAtZero: true,
              grid: { color: "#e5e7eb" },
            },
          },
        }}
      />
    </div>
  );
}
