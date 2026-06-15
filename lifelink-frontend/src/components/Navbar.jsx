import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../services/auth";

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(getToken());
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const syncToken = () => setToken(getToken());
    syncToken();
    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);

  const handleLogout = () => {
    logout();
    setToken(null);
    setMobileOpen(false);
    navigate("/login");
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Requests", to: "/all-requests" },
    { label: "Dashboard", to: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          ❤️ LifeLink AI
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-50 sm:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 sm:flex">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="hover:text-slate-900">
              {item.label}
            </Link>
          ))}
          {!token ? (
            <>
              <Link to="/login" className="hover:text-slate-900">
                Login
              </Link>
              <Link to="/admin/login" className="hover:text-slate-900">
                Admin Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="hover:text-slate-900">
                Profile
              </Link>
              <button onClick={handleLogout} className="hover:text-slate-900">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 sm:hidden">
          <nav className="space-y-2 py-4 text-sm text-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="block rounded-2xl px-4 py-3 transition hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-2xl px-4 py-3 transition hover:bg-slate-100"
                >
                  Login
                </Link>
                <Link
                  to="/admin/login"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-2xl px-4 py-3 transition hover:bg-slate-100"
                >
                  Admin Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-2xl px-4 py-3 transition hover:bg-slate-100"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-2xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
