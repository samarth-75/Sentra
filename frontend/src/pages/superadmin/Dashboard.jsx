import SuperAdminLayout from "../../layout/SuperAdminLayout";

export default function Dashboard() {
  return (
    <SuperAdminLayout>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-gray-600">Total Institutions</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-gray-600">Total Admins</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-gray-600">Pending Verifications</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
      </div>
    </SuperAdminLayout>
  );
}