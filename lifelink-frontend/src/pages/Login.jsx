import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Sending Login Request");

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
      toast.success("Login success");

      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-slate-500">Sign in to access your LifeLink dashboard.</p>

        <div className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              type="email"
              placeholder="you@example.com"
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
          Login
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          New to LifeLink?{' '}
          <Link to="/register" className="font-semibold text-sky-600 hover:text-sky-700">
            Create an account
          </Link>
        </p>
        <p className="mt-3 text-center text-sm text-slate-500">
          Are you an administrator?{' '}
          <Link to="/admin/login" className="font-semibold text-sky-600 hover:text-sky-700">
            Admin Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
