import { z } from "zod";

export const expenseSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .positive("Amount must be greater than 0"),

  category: z.string().min(1, "Category is required"),

  date: z.string().min(1, "Date is required"),

  description: z.string().optional(),
});
