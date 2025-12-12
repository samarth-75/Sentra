import AdminLayout from "../../layout/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-gray-600">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-gray-600">Total Staff</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-gray-600">Incidents</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
      </div>
    </AdminLayout>
  );
}