import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema } from "../Schema/ExpenseSchema";
import { addExpense, updateExpense } from "../Api/ExpenseApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function ExpenseForm({ editData = null }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: "",
      category: "",
      date: "",
      description: "",
    },
  });

  useEffect(() => {
    if (editData) {
      reset(editData);
      setOpen(true);
    }
  }, [editData, reset]);

  const mutation = useMutation({
    mutationFn: editData ? updateExpense : addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      reset();
      setOpen(false);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      ...data,
      amount: Number(data.amount),
      ...(editData && { id: editData.id }),
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {!editData && (
        <Dialog.Trigger className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition">
          Add Expense
        </Dialog.Trigger>
      )}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content
          className="fixed top-1/2 left-1/2 w-[380px]
          -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl"
          aria-describedby="expense-desc"
        >
          <Dialog.Title className="text-xl font-bold mb-1">
            {editData ? "Edit Expense" : "Add Expense"}
          </Dialog.Title>

          <Dialog.Description
            id="expense-desc"
            className="text-sm text-gray-500 mb-4"
          >
            Enter expense details
          </Dialog.Description>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input
              {...register("amount", { valueAsNumber: true })}
              placeholder="Amount"
              className="input"
            />
            {errors.amount && (
              <p className="text-red-500 text-xs">{errors.amount.message}</p>
            )}

            <input
              {...register("category")}
              placeholder="Category"
              className="input"
            />
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category.message}</p>
            )}

            <input type="date" {...register("date")} className="input" />
            {errors.date && (
              <p className="text-red-500 text-xs">{errors.date.message}</p>
            )}

            <textarea
              {...register("description")}
              placeholder="Description"
              className="input resize-none"
            />

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              disabled={mutation.isLoading}
            >
              {editData ? "Update Expense" : "Add Expense"}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
