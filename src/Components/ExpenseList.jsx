export default function ExpenseList({ data, onEdit, onDelete }) {
  return (
    <table className="w-full">
      <tbody>
        {data.map((e) => (
          <tr key={e.id} data-testid="expense-row">
            <td data-testid="expense-amount">₹{e.amount}</td>
            <td data-testid="expense-category">{e.category}</td>
            <td>{e.date}</td>
            <td className="flex gap-2">
              <button data-testid="edit-btn" onClick={() => onEdit(e)}>
                Edit
              </button>
              <button data-testid="delete-btn" onClick={() => onDelete(e.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
