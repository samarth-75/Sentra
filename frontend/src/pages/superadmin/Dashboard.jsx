import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import SuperAdminLayout from "../../layout/SuperAdminLayout";

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  const [institutionsCount, setInstitutionsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/auth/institutions");
      setInstitutionsCount(res.data.length);
    } catch (err) {
      console.error("Superadmin dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SuperAdminLayout>
        <p className="text-gray-600">Loading dashboard...</p>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout>
      <h2 className="text-2xl font-bold mb-6">Superadmin Dashboard</h2>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Institutions"
          value={institutionsCount}
          color="text-blue-600"
        />

        <StatCard
          title="Active Admin Panels"
          value={institutionsCount}
          color="text-green-600"
        />

        <StatCard
          title="System Status"
          value="Running"
          color="text-emerald-600"
          isText
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionButton
            label="Manage Institutions"
            onClick={() => navigate("/superadmin/institutions")}
          />

          <ActionButton
            label="Create New Institution"
            onClick={() => navigate("/superadmin/create-institution")}
          />
        </div>
      </div>
    </SuperAdminLayout>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({ title, value, color, isText = false }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <p className="text-gray-600">{title}</p>
      <h3 className={`text-3xl font-bold ${color}`}>
        {isText ? value : value}
      </h3>
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