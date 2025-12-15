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
import StudentDashboard from "./pages/student/Dashboard";
import StaffDashboard from "./pages/staff/Dashboard";
import ReportIncident from "./pages/student/ReportIncident";
import MyReports from "./pages/student/MyReports";
import StudentAwareness from "./pages/student/Awareness";
import StaffReportIncident from "./pages/staff/ReportIncident";
import StaffMyReports from "./pages/staff/MyReports";
import StaffAwareness from "./pages/staff/Awareness";





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

<Route
  path="/student/dashboard"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/staff/dashboard"
  element={
    <ProtectedRoute allowedRoles={["staff"]}>
      <StaffDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/student/report"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <ReportIncident />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/reports"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <MyReports />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/awareness"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentAwareness />
    </ProtectedRoute>
  }
/>
<Route
  path="/staff/report"
  element={
    <ProtectedRoute allowedRoles={["staff"]}>
      <StaffReportIncident />
    </ProtectedRoute>
  }
/>

<Route
  path="/staff/reports"
  element={
    <ProtectedRoute allowedRoles={["staff"]}>
      <StaffMyReports />
    </ProtectedRoute>
  }
/>

<Route
  path="/staff/awareness"
  element={
    <ProtectedRoute allowedRoles={["staff"]}>
      <StaffAwareness />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}