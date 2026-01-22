import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../Api/ExpenseApi";

export default function SummaryCards() {
  const { data, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  const expenses = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.expenses)
        ? data.expenses
        : [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="h-24 bg-gray-200 animate-pulse rounded-xl" />
        <div className="h-24 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  const totalExpenses = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0,
  );

  const categoriesCount = new Set(expenses.map((e) => e.category)).size;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div
        className="
  p-6 rounded-xl
  bg-gradient-to-r from-emerald-600 to-green-500
  text-white shadow
  transform transition
  hover:-translate-y-1 hover:shadow-xl
"
      >
        <p className="text-sm opacity-80">Total Expenses</p>
        <p className="text-3xl font-bold mt-2">₹{totalExpenses}</p>
      </div>

      <div
        className="
  p-6 rounded-xl
  bg-gradient-to-r from-emerald-600 to-green-500
  text-white shadow
  transform transition
  hover:-translate-y-1 hover:shadow-xl
"
      >
        <p className="text-sm opacity-80">Categories</p>
        <p className="text-3xl font-bold mt-2">{categoriesCount}</p>
      </div>
    </div>
  );
}
