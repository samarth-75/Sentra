import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/student/dashboard" },
    { name: "Report Incident", path: "/student/report" },
    { name: "My Reports", path: "/student/reports" },
    { name: "Awareness Hub", path: "/student/awareness" },
  ];

  return (
    <div className="w-64 bg-white shadow p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">SENTRA</h1>

      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}