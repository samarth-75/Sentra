import Sidebar from "../components/superadmin/Sidebar";
import Topbar from "../components/superadmin/Topbar";

export default function SuperAdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}