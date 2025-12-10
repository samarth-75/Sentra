import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login pressed", { email, password });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      
      {/* Card */}
      <div className="bg-white w-full max-w-md p-8 shadow-lg rounded-xl">
        
        {/* Logo */}
        <h1 className="text-3xl font-bold text-blue-600 text-center">
          SENTRA
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Student Incident Reporting System
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}