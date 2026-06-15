import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { getTokenRole, isAuthenticated } from "../services/auth";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated() && getTokenRole() === "ADMIN") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      const token = response.data?.token;
      const role = response.data?.role;

      if (!token) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", token);
      toast.success("Login successful");

      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-semibold text-slate-900">Admin Sign In</h1>
        <p className="mt-2 text-slate-500">Use your admin credentials to manage LifeLink.</p>

        <div className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              type="email"
              placeholder="admin@lifelink.local"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="mt-8 w-full rounded-2xl bg-sky-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-sky-700"
        >
          Login as Admin
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Want the regular user dashboard?{' '}
          <Link to="/login" className="font-semibold text-sky-600 hover:text-sky-700">
            Use user login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
