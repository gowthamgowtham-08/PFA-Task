import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../Api/ExpenseApi";

export default function UseExpenses(filters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["expenses", filters],
    queryFn: () => getExpenses(filters),
    keepPreviousData: true,
  });

  const add = useMutation({
    mutationFn: addExpense,
    onSuccess: () => queryClient.invalidateQueries(["expenses"]),
  });

  const update = useMutation({
    mutationFn: updateExpense,
    onSuccess: () => queryClient.invalidateQueries(["expenses"]),
  });

  const remove = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => queryClient.invalidateQueries(["expenses"]),
  });

  return { ...query, add, update, remove };
}
