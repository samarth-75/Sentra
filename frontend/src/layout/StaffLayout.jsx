import Sidebar from "../components/staff/Sidebar";
import Topbar from "../components/staff/Topbar";

export default function StaffLayout({ children }) {
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