import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const navigate = useNavigate();

  const loadRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/request/all");
      setRequests(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      await api.put(`/api/request/accept/${requestId}`);
      toast.success("Request accepted");
      loadRequests();
    } catch (error) {
      console.error(error);
      toast.error("Failed to accept request");
    }
  };

  const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const normalize = (s) => (s || "").toString().trim().toLowerCase();
  const titleCase = (s) =>
    s
      .split(" ")
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
      .join(" ");

  const districts = useMemo(() => {
    const set = new Set();
    requests.forEach((r) => {
      const d = normalize(r.district);
      if (d) set.add(d);
    });
    return Array.from(set).sort();
  }, [requests]);

  const filteredRequests = useMemo(() => {
    const q = search.trim().toLowerCase();
    return requests.filter((r) => {
      if (q && !(r.patientName || "").toLowerCase().includes(q)) return false;
      if (bloodGroupFilter && (r.bloodGroup || "") !== bloodGroupFilter) return false;
      if (districtFilter && normalize(r.district) !== districtFilter) return false;
      return true;
    });
  }, [requests, search, bloodGroupFilter, districtFilter]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[2rem] bg-white p-6 shadow-xl border border-slate-200 sm:p-8">
          <div className="mb-4">
            <h1 className="text-3xl font-semibold text-slate-900">All Blood Requests</h1>
            <p className="mt-2 text-slate-500">Browse active requests and support patients in need.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.8fr_1fr_1fr] lg:grid-cols-[2fr_1.2fr_1.2fr_0.8fr]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patient name"
              className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            <select
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
              className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            >
              <option value="">All blood groups</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            >
              <option value="">All districts</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {titleCase(d)}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setBloodGroupFilter("");
                setDistrictFilter("");
              }}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Clear
            </button>
          </div>
        </section>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            Loading requests...
          </div>
        ) : null}

        {!loading && requests.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            No requests available yet.
          </div>
        ) : null}

        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{request.patientName}</h2>
                  <p className="mt-1 text-sm text-slate-500">{request.hospitalName} • {request.district}</p>
                </div>
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {request.status || "Pending"}
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Blood Group</p>
                  <p className="mt-1 text-slate-900">{request.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Required By</p>
                  <p className="mt-1 text-slate-900">{request.requiredBy || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Units Needed</p>
                  <p className="mt-1 text-slate-900">{request.unitsNeeded ?? "1"}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Link
                  to={`/details/${request.id}`}
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  View Details
                </Link>
                <button
                  onClick={() => navigate(`/recommended-donors/${request.id}`)}
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  AI Match Donors
                </button>
                {request.status === "PENDING" && (
                  <button
                    type="button"
                    onClick={() => handleAccept(request.id)}
                    className="inline-flex items-center justify-center rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    Accept Request
                  </button>
                )}
              </div>
            </div>
          ))}

          {!loading && requests.length > 0 && filteredRequests.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
              No matching requests found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllRequests;
