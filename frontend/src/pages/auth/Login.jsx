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
      // backend responds with: { token, role, institutionId, name }
      const { token, role, institutionId, name } = res.data;
      saveAuth({ token, role, institutionId, name });

      // redirect based on role
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-blue-600 text-center">SENTRA</h1>
        <p className="text-gray-600 text-center mb-6">Student Incident Reporting System</p>

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
      </div>
    </div>
  );
}