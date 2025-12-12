// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTH
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// SUPERADMIN PAGES
import Dashboard from "./pages/superadmin/Dashboard";
import CreateInstitution from "./pages/superadmin/CreateInstitution";
import InstitutionsList from "./pages/superadmin/InstitutionsList";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import Staff from "./pages/admin/Staff";
import Incidents from "./pages/admin/Incidents";
import Awareness from "./pages/admin/Awareness";

// OPTIONAL TEMP DASHBOARDS (until you build real ones)
//const AdminDashboard = () => <div className="p-6">Admin Dashboard</div>;
const StaffDashboard = () => <div className="p-6">Staff Dashboard</div>;
const StudentDashboard = () => <div className="p-6">Student Dashboard</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* SUPERADMIN ROUTES */}
        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/superadmin/create-institution"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <CreateInstitution />
            </ProtectedRoute>
          }
        />

        <Route
          path="/superadmin/institutions"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <InstitutionsList />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* STAFF ROUTE */}
        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        {/* STUDENT ROUTE */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/students"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <Students />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/staff"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <Staff />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/incidents"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <Incidents />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/awareness"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <Awareness />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}