import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">Staff Dashboard</h2>

      <div className="flex items-center gap-4">
        <span className="text-gray-700">{auth.name}</span>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="text-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}