// context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const raw = localStorage.getItem("sentra_auth");
      return raw ? JSON.parse(raw) : { token: null, role: null, name: null, institutionId: null };
    } catch {
      return { token: null, role: null, name: null, institutionId: null };
    }
  });

  useEffect(() => {
    // apply token to axios on mount / change
    setAuthToken(auth.token);
  }, [auth.token]);

  const saveAuth = (data) => {
    const next = {
      token: data.token,
      role: data.role,
      name: data.name,
      institutionId: data.institutionId,
    };
    setAuth(next);
    localStorage.setItem("sentra_auth", JSON.stringify(next));
    setAuthToken(next.token);
  };

  const logout = () => {
    setAuth({ token: null, role: null, name: null, institutionId: null });
    localStorage.removeItem("sentra_auth");
    setAuthToken(null);
  };

  return <AuthContext.Provider value={{ auth, saveAuth, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}