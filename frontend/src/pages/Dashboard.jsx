import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">MediVault Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {user ? (
          <>
            {/* Welcome card */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome, {user.full_name || user.email} 👋
              </h2>
              <p className="text-gray-600 mt-1">Role: {user.role}</p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-gray-500">Patients</h3>
                <p className="text-2xl font-bold text-indigo-600">124</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-gray-500">Doctors</h3>
                <p className="text-2xl font-bold text-indigo-600">32</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-gray-500">Appointments</h3>
                <p className="text-2xl font-bold text-indigo-600">57</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-gray-500">Expenses</h3>
                <p className="text-2xl font-bold text-indigo-600">$1,200</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Loading user info...</p>
        )}
      </main>
    </div>
  );
}
