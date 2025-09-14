import { useEffect, useState } from "react";
import api from "../lib/api";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [patientId, setPatientId] = useState(1);
  const [category, setCategory] = useState("MEDICINE");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [incurredOn, setIncurredOn] = useState("");

  // Fetch
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    api.get(`/expenses/?patient_id=${patientId}`)
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  // Handle form submit
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/expenses/", {
        patient_id: patientId,
        category,
        amount: Number(amount),
        description,
        incurred_on: incurredOn
      });
      fetchExpenses(); // refresh
      setAmount("");
      setDescription("");
      setIncurredOn("");
    } catch (err) {
      console.error(err);
      alert("Failed to create expense");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Expenses</h1>

      {/* Form */}
      <form onSubmit={handleCreate} className="mb-6 space-y-2 border p-4 rounded">
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 ml-2">
            <option value="MEDICINE">Medicine</option>
            <option value="CONSULTATION">Consultation</option>
            <option value="LAB">Lab</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 ml-2"
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 ml-2"
          />
        </div>
        <div>
          <label>Incurred On:</label>
          <input
            type="date"
            value={incurredOn}
            onChange={(e) => setIncurredOn(e.target.value)}
            className="border p-2 ml-2"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
          Add Expense
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {expenses.map(exp => (
            <li key={exp.id} className="border p-3 rounded">
              <p><strong>Category:</strong> {exp.category}</p>
              <p><strong>Amount:</strong> ${exp.amount}</p>
              <p><strong>Date:</strong> {exp.incurred_on}</p>
              <p><strong>Description:</strong> {exp.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
