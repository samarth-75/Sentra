import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import API from "../../services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [studentsCount, setStudentsCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // 1️⃣ Dashboard stats (MOST IMPORTANT)
        const dashboardRes = await API.get("/auth/admin/dashboard");
        setStats(dashboardRes.data);

        // 2️⃣ Students count
        try {
          const studentsRes = await API.get("/auth/users/student");
          setStudentsCount(studentsRes.data.length);
        } catch {
          setStudentsCount(0);
        }

        // 3️⃣ Staff count
        try {
          const staffRes = await API.get("/auth/users/staff");
          setStaffCount(staffRes.data.length);
        } catch {
          setStaffCount(0);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading || !stats) {
    return (
      <AdminLayout>
        <p className="text-gray-600">Loading dashboard...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm">
          Monitor institution activity and incident reports
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total Students" value={studentsCount} color="text-blue-600" />
        <DashboardCard title="Total Staff" value={staffCount} color="text-green-600" />
        <DashboardCard title="Total Incidents" value={stats.total} color="text-red-600" />
        <DashboardCard title="Pending Incidents" value={stats.pending} color="text-yellow-600" />
      </div>

      {/* RECENT INCIDENTS */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Recent Incidents</h3>

        {stats.recentIncidents.length === 0 ? (
          <p className="text-gray-500">No incidents reported yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="pb-2">Ref ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentIncidents.map((i) => (
                <tr key={i._id} className="border-b">
                  <td className="py-3">{i.referenceId}</td>
                  <td>{i.title}</td>
                  <td>{i.category}</td>
                  <td>
                    <StatusBadge status={i.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction label="Manage Incidents" onClick={() => navigate("/admin/incidents")} />
          <QuickAction label="Manage Students" onClick={() => navigate("/admin/students")} />
          <QuickAction label="Manage Staff" onClick={() => navigate("/admin/staff")} />
        </div>
      </div>
    </AdminLayout>
  );
}

/* ---------- COMPONENTS ---------- */

function DashboardCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
}

function QuickAction({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition font-medium"
    >
      {label}
    </button>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${styles[status]}`}>
      {status}
    </span>
  );
}