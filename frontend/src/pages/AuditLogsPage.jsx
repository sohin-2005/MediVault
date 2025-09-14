import { useEffect, useState } from "react";
import api from "../lib/api";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/audit-logs/?limit=20")
      .then(res => setLogs(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Audit Logs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {logs.map(log => (
            <li key={log.id} className="border p-3 rounded">
              <p><strong>Action:</strong> {log.action}</p>
              <p><strong>User:</strong> {log.user_id ?? "System"}</p>
              <p><strong>Entity:</strong> {log.entity_type} (ID: {log.entity_id})</p>
              <p><strong>When:</strong> {new Date(log.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
