import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import useAuthStore from "../store/authStore";

function Login() {
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      loginStore(res.data);

      if (res.data.user.role === "ADMIN") {
        navigate("/admin/subscriptions");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        theme === "light"
          ? "bg-white"
          : "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
      }`}
    >
      <div className="absolute top-5 right-5">
        <button
          onClick={() => {
            const nextTheme = theme === "dark" ? "light" : "dark";

            localStorage.setItem("theme", nextTheme);
            setTheme(nextTheme);
          }}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
      {/* Card */}
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="text-gray-400 text-sm mt-2">
            Login to continue to your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              className="mt-1 w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
