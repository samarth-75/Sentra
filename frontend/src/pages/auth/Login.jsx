// pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { saveAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, role, institutionId, name } = res.data;

      saveAuth({ token, role, institutionId, name });

      if (role === "superadmin") navigate("/superadmin/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
      else if (role === "staff") navigate("/staff/dashboard");
      else navigate("/student/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-5xl shadow-xl rounded-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT – LOGIN */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-blue-600 text-center">
            SENTRA
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Student Incident Reporting System
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div>
              <label className="text-gray-700 mb-1 block">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-700 mb-1 block">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* NOTE */}
          <div className="mt-6 text-sm text-gray-600 bg-blue-50 p-3 rounded border border-blue-200">
            <strong>Note:</strong> Demo credentials are provided on the right
            for evaluation purposes only. In production, this section will be removed.
          </div>
        </div>

        {/* RIGHT – DEMO & ROLE INFO */}
        <div className="bg-gray-50 p-8 border-l space-y-6">

          {/* DEMO CREDENTIALS */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Demo Login Credentials
            </h2>

            <div className="space-y-3 text-sm">
              <Credential
                role="Super Admin"
                email="superadmin@sentra.com"
                password="SuperAdmin@123"
              />
              <Credential
                role="Admin"
                email="demo@sentra.admin"
                password="Admin@123"
              />
              <Credential
                role="Student"
                email="demoStudent@gmail.com"
                password="ffuk5m9ma3A1@"
              />
              <Credential
                role="Staff"
                email="demoStaff@gmail.com"
                password="c6whe202tcA1@"
              />
            </div>
          </div>

          {/* ROLE EXPLANATION */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Role Capabilities
            </h2>

            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>
                <strong>Super Admin:</strong> Manages institutions and system-level access
              </li>
              <li>
                <strong>Admin:</strong> Manages incidents, users, and awareness content
              </li>
              <li>
                <strong>Student:</strong> Reports incidents and tracks their status
              </li>
              <li>
                <strong>Staff:</strong> Reports incidents and accesses awareness resources
              </li>
            </ul>
          </div>

          {/* WARNING */}
          <div className="text-xs text-red-600 bg-red-50 p-3 rounded border border-red-200">
            ⚠ This application is a demo version created for academic and internship
            evaluation purposes. All data shown is non-sensitive and sample-based.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENT ---------- */

function Credential({ role, email, password }) {
  return (
    <div className="bg-white p-3 rounded border">
      <p className="font-semibold text-gray-800">{role}</p>
      <p className="text-gray-600">Email: {email}</p>
      <p className="text-gray-600">Password: {password}</p>
    </div>
  );
}