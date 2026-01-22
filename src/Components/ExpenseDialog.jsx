import * as Dialog from "@radix-ui/react-dialog";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseDialog({ expense, trigger }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 w-[90%] sm:w-[420px]
          -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6"
        >
          <h2 className="font-bold text-lg mb-4">Edit Expense</h2>
          <ExpenseForm defaultValues={expense} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
