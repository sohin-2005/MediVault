import { useEffect, useState } from "react";
import api from "../lib/api";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [patientId, setPatientId] = useState(1);
  const [doctorId, setDoctorId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  // Fetch appointments
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    api.get(`/appointments/?patient_id=${patientId}`)
      .then(res => setAppointments(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  // Handle form submit
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/appointments/", {
        patient_id: patientId,
        doctor_id: Number(doctorId),
        scheduled_at: scheduledAt,
        status: "BOOKED"
      });
      fetchAppointments(); // refresh
      setDoctorId("");
      setScheduledAt("");
    } catch (err) {
      console.error(err);
      alert("Failed to create appointment");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Appointments</h1>

      {/* Create form */}
      <form onSubmit={handleCreate} className="mb-6 space-y-2 border p-4 rounded">
        <div>
          <label>Doctor ID:</label>
          <input
            type="number"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="border p-2 ml-2"
            required
          />
        </div>
        <div>
          <label>Scheduled At:</label>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="border p-2 ml-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
          Add Appointment
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {appointments.map(app => (
            <li key={app.id} className="border p-3 rounded">
              <p><strong>Doctor:</strong> {app.doctor_id}</p>
              <p><strong>Scheduled:</strong> {new Date(app.scheduled_at).toLocaleString()}</p>
              <p><strong>Status:</strong> {app.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
