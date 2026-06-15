import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import api from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRequests: 0,
    myRequests: 0,
    acceptedRequests: 0,
    availableDonors: 0,
  });

  const loadStats = async () => {
    try {
      const response = await api.get("/api/user/dashboard-stats");
      setStats(response.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const chartData = [
    { name: "Accepted", value: stats.acceptedRequests || 0 },
    { name: "Pending", value: Math.max((stats.totalRequests || 0) - (stats.acceptedRequests || 0), 0) },
  ];

  const overviewData = [
    { name: "Total", value: stats.totalRequests || 0 },
    { name: "Mine", value: stats.myRequests || 0 },
    { name: "Accepted", value: stats.acceptedRequests || 0 },
    { name: "Donors", value: stats.availableDonors || 0 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[2rem] bg-white p-6 shadow-xl border border-slate-200 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-slate-900">Dashboard</h1>
              <p className="mt-2 text-slate-500">Quick access to your LifeLink requests and workflows.</p>
            </div>
            <Link
              to="/profile"
              className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
            >
              <FaUserCircle className="h-6 w-6" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Total Requests</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.totalRequests}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">My Requests</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.myRequests}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Accepted Requests</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.acceptedRequests}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Available Donors</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.availableDonors}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/create-request"
            className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:border-sky-300 hover:bg-sky-50"
          >
            <h2 className="text-xl font-semibold text-slate-900">Create Request</h2>
            <p className="mt-2 text-slate-500">Submit a new blood request.</p>
          </Link>
          <Link
            to="/all-requests"
            className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:border-sky-300 hover:bg-sky-50"
          >
            <h2 className="text-xl font-semibold text-slate-900">All Requests</h2>
            <p className="mt-2 text-slate-500">Browse every active request.</p>
          </Link>
          <Link
            to="/my-requests"
            className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:border-sky-300 hover:bg-sky-50"
          >
            <h2 className="text-xl font-semibold text-slate-900">My Requests</h2>
            <p className="mt-2 text-slate-500">View requests you created.</p>
          </Link>
          <Link
            to="/accepted-requests"
            className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:border-sky-300 hover:bg-sky-50"
          >
            <h2 className="text-xl font-semibold text-slate-900">Accepted Requests</h2>
            <p className="mt-2 text-slate-500">See requests that have matched donors.</p>
          </Link>
          <button
            type="button"
            onClick={() => navigate("/ai-chat")}
            className="col-span-full rounded-[1.75rem] border border-blue-200 bg-blue-50 p-6 text-left shadow-sm transition hover:bg-blue-100"
          >
            <h2 className="text-xl font-semibold text-slate-900">🤖 Chat With AI</h2>
            <p className="mt-2 text-slate-500">Ask blood donation, emergency, health, and LifeLink related questions.</p>
          </button>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Requests: Accepted vs Pending</h3>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    label
                  >
                    <Cell key="accepted" fill="#10B981" />
                    <Cell key="pending" fill="#F59E0B" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Counts Overview</h3>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={overviewData} margin={{ left: -16 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
