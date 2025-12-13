import StudentLayout from "../../layout/StudentLayout";

export default function StudentDashboard() {
  return (
    <StudentLayout>
      <h2 className="text-2xl font-bold mb-4">Welcome 👋</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600">Total Reports</p>
          <h3 className="text-3xl font-bold text-blue-600">0</h3>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600">Pending</p>
          <h3 className="text-3xl font-bold text-yellow-500">0</h3>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600">Resolved</p>
          <h3 className="text-3xl font-bold text-green-600">0</h3>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Report a new incident</li>
          <li>Track your previous reports</li>
          <li>Read awareness articles</li>
        </ul>
      </div>
    </StudentLayout>
  );
}