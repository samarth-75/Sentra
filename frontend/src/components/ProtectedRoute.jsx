// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * props:
 *  - children: element to render when allowed
 *  - allowedRoles: optional array of roles (["admin","superadmin"])
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { auth } = useAuth();

  if (!auth?.token) {
    // not logged in
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    // logged in but not allowed
    return <Navigate to="/" replace />;
  }

  return children;
}