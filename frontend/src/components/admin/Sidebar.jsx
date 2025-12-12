import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Students", path: "/admin/students" },
    { name: "Staff", path: "/admin/staff" },
    { name: "Incidents", path: "/admin/incidents" },
    { name: "Awareness", path: "/admin/awareness" },
  ];

  return (
    <div className="w-64 bg-white shadow-xl min-h-screen p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h1>

      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded-lg font-medium ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "text-gray-800 hover:bg-blue-100"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}