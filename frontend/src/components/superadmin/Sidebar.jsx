import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const { auth } = useAuth();

  const menu = [
    { name: "Dashboard", path: "/superadmin/dashboard" },
    { name: "Create Institution", path: "/superadmin/create-institution" },
    { name: "Institutions List", path: "/superadmin/institutions" },
  ];

  return (
    <div className="w-64 bg-white shadow-xl min-h-screen p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">SENTRA</h1>

      <p className="text-sm text-gray-500 mb-4">{auth.name}</p>

      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded-lg font-medium
              ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }
            `}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}