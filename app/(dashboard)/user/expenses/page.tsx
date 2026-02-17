"use client";

import { useEffect, useState } from "react";
import api from "axios"; 
import { useRouter } from "next/navigation";

export default function ExpensePage() {
  const router = useRouter();

  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH ================= */
  const fetchExpenses = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/api/expenses");

      if (res.data?.success) {
        setExpenses(res.data.data || []);
      } else {
        setExpenses([]);
      }
    } catch (err: any) {
      console.error(err);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError(err.response?.data?.message || "Failed to load expenses");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  /* ================= DELETE ================= */
  const deleteExpense = async (id: number) => {
    if (!confirm("Delete this expense?")) return;

    try {
      await api.delete(`/api/expenses?id=${id}`);
      fetchExpenses();
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  /* ================= UI STATES ================= */

  if (loading) return <p className="p-4">Loading expenses...</p>;

  if (error)
    return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Expenses</h1>

        <button
          onClick={() => router.push("/user/expenses/add")}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          + Add Expense
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Person</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Sub Category</th>
              <th className="p-2 text-left">Project</th>
              <th className="p-2 text-left">Detail</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length === 0 && (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  No expenses found
                </td>
              </tr>
            )}

            {expenses.map((expense) => (
              <tr key={expense.ExpenseID} className="border-t">

                <td className="p-2">
                  {new Date(expense.ExpenseDate).toLocaleDateString()}
                </td>

                <td className="p-2 font-medium text-red-600">
                  ₹ {expense.Amount}
                </td>

                <td className="p-2">
                  {expense.peoples?.PeopleName ?? "-"}
                </td>

                <td className="p-2">
                  {expense.categories?.CategoryName ?? "-"}
                </td>

                <td className="p-2">
                  {expense.sub_categories?.SubCategoryName ?? "-"}
                </td>

                <td className="p-2">
                  {expense.projects?.ProjectName ?? "-"}
                </td>

                <td className="p-2">
                  {expense.ExpenseDetail ?? "-"}
                </td>

                <td className="p-2 space-x-2">
                  <button
                    className="text-blue-600"
                    onClick={() =>
                      router.push(`/user/expenses/edit/${expense.ExpenseID}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-600"
                    onClick={() => deleteExpense(expense.ExpenseID)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
