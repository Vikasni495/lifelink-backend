import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    district: "",
    bloodGroup: "O+",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/api/auth/register", {
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          bloodGroup: formData.bloodGroup,
          district: formData.district,
        }
      );

      toast.success("Registration successful");
      console.log(response.data);

    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="hidden flex-1 flex-col justify-between bg-gradient-to-br from-sky-600 to-blue-800 px-12 py-10 text-white lg:flex">
        <div>
          <h1 className="text-4xl font-bold">LifeLink AI ❤️</h1>
        </div>

        <div>
          <p className="mb-8 text-xl font-light leading-relaxed">
            Join our community of donors and help save lives through
            intelligent blood matching.
          </p>

          <ul className="space-y-4 text-lg font-medium">
            <li>✅ AI Powered Matching</li>
            <li>✅ Real-Time Emergency Alerts</li>
            <li>✅ Secure & Trusted Platform</li>
          </ul>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 flex-col justify-center px-8 py-10 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <h2 className="text-3xl font-semibold text-slate-900">
            Create Account
          </h2>

          <p className="mt-2 text-slate-500">
            Register as a donor or recipient
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleRegister}>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Full Name
              </span>
              <input
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Phone</span>
              <input
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                type="text"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">District</span>
              <input
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Password
              </span>
              <input
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Confirm Password
              </span>
              <input
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Select Blood Group
              </span>
              <select
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </label>

            <button
              type="submit"
              className="mt-8 w-full rounded-lg bg-sky-600 px-4 py-2 text-base font-semibold text-white transition hover:bg-sky-700"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-sky-600 hover:text-sky-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
