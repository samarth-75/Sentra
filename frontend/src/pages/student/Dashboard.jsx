import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../layout/StudentLayout";
import API from "../../services/api";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [resolved, setResolved] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/auth/incident/my");
      const incidents = res.data;

      setTotal(incidents.length);
      setPending(incidents.filter(i => i.status === "Pending").length);
      setResolved(incidents.filter(i => i.status === "Resolved").length);
    } catch (err) {
      console.error("Dashboard stats error:", err);
    }
  };

  return (
    <StudentLayout>
      <h2 className="text-2xl font-bold mb-6">Welcome 👋</h2>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Reports" value={total} color="text-blue-600" />
        <StatCard title="Pending" value={pending} color="text-yellow-500" />
        <StatCard title="Resolved" value={resolved} color="text-green-600" />
      </div>

      {/* ACTION BUTTONS */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionButton label="Report Incident" onClick={() => navigate("/student/report")} />
          <ActionButton label="My Reports" onClick={() => navigate("/student/my-reports")} />
          <ActionButton label="Awareness Hub" onClick={() => navigate("/student/awareness")} />
        </div>
      </div>
    </StudentLayout>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <p className="text-gray-600">{title}</p>
      <h3 className={`text-3xl font-bold ${color}`}>{value}</h3>
    </div>
  );
}

function ActionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
    >
      {label}
    </button>
  );
}