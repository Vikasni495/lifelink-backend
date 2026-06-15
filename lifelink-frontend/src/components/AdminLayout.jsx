import { Link, Outlet } from "react-router-dom";
import { logout, isAdmin } from "../services/auth";
import { useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-5 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">LifeLink Admin</h1>
            <p className="text-sm text-slate-500">Admin management console</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
              Dashboard
            </Link>
            <Link to="/admin/users" className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
              Users
            </Link>
            <Link to="/admin/requests" className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
              Requests
            </Link>
            <button onClick={handleLogout} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
