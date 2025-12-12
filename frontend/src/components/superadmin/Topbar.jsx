import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-full bg-white h-16 shadow flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">SuperAdmin Dashboard</h2>

      <button
        onClick={handleLogout}
        className="text-red-600 hover:text-red-800"
      >
        Logout
      </button>
    </div>
  );
}