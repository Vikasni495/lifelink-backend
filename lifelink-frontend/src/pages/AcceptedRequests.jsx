import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function AcceptedRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAcceptedRequests();
  }, []);

  const loadAcceptedRequests = async () => {
    try {
      const response = await api.get("/api/request/accepted");
      setRequests(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load accepted requests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-slate-900">
            Accepted Requests
          </h1>
          <p className="mt-2 text-slate-500">
            Requests you have accepted as a donor.
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            Loading...
          </div>
        ) : requests.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            No accepted requests found.
          </div>
        ) : (
          <div className="space-y-5">
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

                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    ACCEPTED
                  </span>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-slate-500">Blood Group</p>
                    <p className="font-semibold">
                      {request.bloodGroup}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Urgency</p>
                    <p className="font-semibold">
                      {request.urgency}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Contact</p>
                    <p className="font-semibold">
                      {request.contactNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <p className="font-semibold text-green-600">
                      {request.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AcceptedRequests;
