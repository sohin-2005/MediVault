import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AppointmentsPage from "./pages/AppointmentsPage";
import ExpensesPage from "./pages/ExpensesPage";
import AuditLogsPage from "./pages/AuditLogsPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/appointments">Appointments</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/audit-logs">Audit Logs</Link>
      </nav>
      <Routes>
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/audit-logs" element={<AuditLogsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
