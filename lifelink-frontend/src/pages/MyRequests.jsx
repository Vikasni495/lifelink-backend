import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function MyRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const fetchMyRequests = async () => {
    try {
      const response = await api.get("/api/request/my-requests");
      setRequests(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load requests");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMyRequests();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 rounded-xl bg-slate-200 px-4 py-2 hover:bg-slate-300"
        >
          ← Back
        </button>

        <h1 className="mb-2 text-4xl font-bold text-slate-900">
          My Requests
        </h1>

        <p className="mb-8 text-slate-500">
          View all blood requests you have created.
        </p>

        <div className="space-y-6">
          {requests.map((request) => (
            <div
              key={request.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {request.patientName}
                  </h2>

                  <p className="mt-1 text-slate-500">
                    {request.hospitalName} • {request.district}
                  </p>
                </div>

                <span
                  className={`rounded-full px-5 py-2 font-semibold ${
                    request.status === "ACCEPTED"
                      ? "bg-green-100 text-green-700"
                      : request.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {request.status}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm text-slate-500">Blood Group</p>
                  <p className="font-semibold">{request.bloodGroup}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Urgency</p>
                  <p className="font-semibold">{request.urgency}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Contact</p>
                  <p className="font-semibold">{request.contactNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Created</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(request.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to={`/details/${request.id}`}
                  className="inline-flex rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}

          {requests.length === 0 && (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <p className="text-slate-500">No requests created yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyRequests;
