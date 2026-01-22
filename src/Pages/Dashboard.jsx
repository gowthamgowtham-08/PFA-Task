import { useState } from "react";

import ExpenseForm from "../Components/ExpenseForm";
import ExpenseTable from "../Components/ExpenseTable";
import ExpensesChart from "../Components/ExpensesChart";
import Filters from "../Components/Filters";
import Pagination from "../Components/Pagination";
import SummaryCards from "../Components/Summarycards";

export default function Dashboard() {
  return (
    <div
      className="
        p-4 sm:p-6 space-y-8
        animate-in fade-in slide-in-from-bottom-6 duration-700
      "
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Expense Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Track, manage and analyze your expenses
          </p>
        </div>
        <ExpenseForm />
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4 animate-in fade-in zoom-in-95 duration-700">
          <ExpensesChart />
        </div>

        <div className="bg-white rounded-xl shadow p-4 animate-in fade-in slide-in-from-right-8 duration-700">
          <Filters />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <ExpenseTable />
        <Pagination />
      </div>
    </div>
  );
}
