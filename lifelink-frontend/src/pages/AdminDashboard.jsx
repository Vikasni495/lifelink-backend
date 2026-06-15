import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { isAdmin, logout } from "../services/auth";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/dashboard", { replace: true });
      return;
    }

    const loadStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/api/admin/dashboard-stats");
        console.log("DASHBOARD =", response.data);
        setStats(response.data);
      } catch (err) {
        console.error("Admin dashboard fetch error:", err);
        setError("Unable to load admin dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl text-center">
          <p className="text-lg font-medium text-slate-900">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
        <div className="rounded-[2rem] border border-red-200 bg-red-50 p-10 shadow-sm text-center">
          <p className="text-lg font-semibold text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">Admin Console</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">LifeLink Admin Dashboard</h1>
            <p className="mt-2 text-slate-500">Real-time statistics and admin actions for your team.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm">
              <span className="text-xl font-semibold">A</span>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm font-semibold text-slate-900">Admin</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Total Users</p>
            <p className="mt-5 text-4xl font-semibold text-slate-900">{stats.totalUsers}</p>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Total Requests</p>
            <p className="mt-5 text-4xl font-semibold text-slate-900">{stats.totalRequests}</p>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Pending Requests</p>
            <p className="mt-5 text-4xl font-semibold text-slate-900">{stats.pendingRequests}</p>
          </div>
          <div className="rounded-[1.75rem] border border-red-200 bg-red-50 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-red-600">Critical Requests</p>
            <p className="mt-5 text-4xl font-semibold text-red-700">{stats.criticalRequests}</p>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Accepted Requests</p>
            <p className="mt-5 text-4xl font-semibold text-slate-900">{stats.acceptedRequests}</p>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Available Donors</p>
            <p className="mt-5 text-4xl font-semibold text-slate-900">{stats.availableDonors}</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-900">🤖 AI Insights</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-4">
              <p className="text-sm font-medium text-slate-600">Critical Requests</p>
              <p className="mt-2 text-3xl font-bold text-red-600">{stats.criticalRequests}</p>
            </div>
            <div className="rounded-xl bg-white p-4">
              <p className="text-sm font-medium text-slate-600">Highest Priority</p>
              <p className="mt-2 text-3xl font-bold text-blue-600">{stats.highestPriorityScore}</p>
            </div>
            <div className="rounded-xl bg-white p-4">
              <p className="text-sm font-medium text-slate-600">Average Priority</p>
              <p className="mt-2 text-3xl font-bold text-emerald-600">{stats.averagePriorityScore?.toFixed(1)}</p>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-white p-4">
            <p className="text-sm font-medium text-slate-600">AI Recommendation</p>
            <p className="mt-2 text-base font-semibold text-slate-900">{stats.aiRecommendation}</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Admin Actions</h2>
            <p className="mt-2 text-sm text-slate-500">Quick access to key admin workflows.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => navigate("/admin/users")}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 text-left text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
              >
                Manage Users
              </button>
              <button
                onClick={() => navigate("/admin/requests")}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 text-left text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
              >
                Manage Requests
              </button>
              <button
                onClick={() => navigate("/admin/users")}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 text-left text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
              >
                View Donors
              </button>
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 text-left text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
              >
                Analytics
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
            <h2 className="text-xl font-semibold">Performance Summary</h2>
            <p className="mt-3 text-sm text-slate-300">Track admin KPIs across users, donors, and requests.</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-slate-800 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Request Conversion</p>
                <p className="mt-3 text-3xl font-semibold">{stats.acceptedRequests}/{stats.totalRequests}</p>
              </div>
              <div className="rounded-3xl bg-slate-800 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Donor Availability</p>
                <p className="mt-3 text-3xl font-semibold">{stats.availableDonors}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
