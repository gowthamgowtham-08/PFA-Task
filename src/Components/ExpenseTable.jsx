import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getExpenses, deleteExpense } from "../Api/ExpenseApi";
import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseTable() {
  const queryClient = useQueryClient();
  const [editData, setEditData] = useState(null);

  const { data } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  const expenses = Array.isArray(data) ? data : [];

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      {editData && (
        <ExpenseForm editData={editData} onClose={() => setEditData(null)} />
      )}

      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-slate-50">
              <td className="p-3 font-medium">₹{expense.amount}</td>
              <td className="p-3">{expense.category}</td>
              <td className="p-3">{expense.date}</td>
              <td className="p-3 text-gray-500">{expense.description}</td>

              <td className="p-3 text-right flex gap-2 justify-end">
                <button
                  onClick={() => setEditData(expense)}
                  className="px-3 py-1 text-sm rounded-lg bg-amber-500 text-white hover:bg-amber-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMutation.mutate(expense.id)}
                  className="px-3 py-1 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
