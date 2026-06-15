import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const STATUS_OPTIONS = ["PENDING", "ACCEPTED", "COMPLETED", "CANCELED"];

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/admin/requests");
      setRequests(response.data || []);
    } catch (error) {
      console.error("Failed to load requests", error);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/admin/requests/${id}/status`, { status });
      toast.success("Request status updated");
      loadRequests();
    } catch (error) {
      console.error("Failed to update request status", error);
      toast.error("Failed to update request status");
    }
  };

  useEffect(() => {
    const fetchAdminRequests = async () => {
      await loadRequests();
    };

    fetchAdminRequests();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-200">
        <h1 className="text-3xl font-semibold text-slate-900">Manage Requests</h1>
        <p className="mt-2 text-slate-500">Review all blood requests and update statuses.</p>
      </div>

      {/* AI Priority Requests Section */}
      {requests.filter(r => r.priorityScore >= 80).length > 0 && (
        <div className="rounded-[2rem] bg-white p-6 shadow-xl border border-red-200 border-l-4 border-l-red-500">
          <h2 className="text-2xl font-semibold text-red-700">🚨 AI Priority Requests</h2>
          <p className="mt-1 text-sm text-red-600">High and critical urgency requests requiring immediate attention</p>
          <div className="mt-4 space-y-3">
            {requests
              .filter(r => r.priorityScore >= 80)
              .slice(0, 3)
              .map(request => (
                <div key={request.id} className="flex items-center justify-between rounded-lg bg-red-50 p-4">
                  <div className="flex-1">
                    <p className="font-semibold text-red-900">{request.patientName}</p>
                    <p className="text-sm text-red-700">
                      Priority Score:{" "}
                      <span className="font-bold">{request.priorityScore}</span>
                    </p>
                    <p className="text-sm text-red-600">Urgency: {request.urgency}</p>
                  </div>
                  <span className={`ml-4 rounded-full px-3 py-1 text-sm font-semibold ${
                    request.priorityScore === 100 ? "bg-red-200 text-red-800" : "bg-amber-200 text-amber-800"
                  }`}>
                    {request.priorityScore === 100 ? "Critical" : "High"}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="rounded-[2rem] bg-white p-6 shadow-xl border border-slate-200 overflow-x-auto">
        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading requests...</div>
        ) : (
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Blood Group</th>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">Urgency</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Requester</th>
                <th className="px-4 py-3">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-4 text-slate-900">{request.patientName}</td>
                  <td className="px-4 py-4 text-slate-500">{request.bloodGroup}</td>
                  <td className="px-4 py-4 text-slate-500">{request.district || "—"}</td>
                  <td className="px-4 py-4 text-slate-500">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      request.urgency === "CRITICAL" ? "bg-red-100 text-red-700" :
                      request.urgency === "HIGH" ? "bg-amber-100 text-amber-700" :
                      request.urgency === "MEDIUM" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {request.urgency || "N/A"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-500">
                    <span className="font-semibold">{request.priorityScore || 0}</span>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={request.status || "PENDING"}
                      onChange={(e) => updateStatus(request.id, e.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{request.requesterName || "Unknown"}</td>
                  <td className="px-4 py-4 text-slate-500">{new Date(request.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminRequests;
