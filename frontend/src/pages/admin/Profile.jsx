import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../layout/AdminLayout";

export default function Profile() {
  const { auth } = useAuth();

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="bg-white p-6 rounded shadow w-full max-w-lg">
        <p className="text-gray-700 mb-2">
          <strong>Name:</strong> {auth?.name}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Email:</strong> {auth?.email}
        </p>
        <p className="text-gray-700">
          <strong>Role:</strong> Admin
        </p>
      </div>
    </AdminLayout>
  );
}