import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function RequestDetails() {
  const { id } = useParams();

  const [request, setRequest] = useState(null);
  const [recommendedDonors, setRecommendedDonors] = useState([]);

  useEffect(() => {
    fetchDetails();
    fetchRecommendedDonors();
  }, [id]);

  const fetchDetails = async () => {
    try {
      const response = await api.get(`/api/request/details/${id}`);
      setRequest(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load request details");
    }
  };

  const fetchRecommendedDonors = async () => {
    try {
      const response = await api.get(`/api/request/${id}/recommended-donors`);
      setRecommendedDonors(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load recommended donors");
    }
  };

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          Loading request details...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-200">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-slate-900">Request Details</h1>
              <p className="text-slate-500">View request status, patient details, and AI recommendation support for urgent matching.</p>
            </div>

            <span
              className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                request.status === "ACCEPTED"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {request.status}
            </span>
          </div>

          <div className="mt-8 grid gap-8 rounded-[2rem] bg-slate-50 p-8 md:grid-cols-2">
            <div className="space-y-4 rounded-[1.75rem] bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Patient</p>
              <h2 className="text-3xl font-bold text-slate-900">{request.patientName}</h2>
              <p className="text-slate-600">{request.hospitalName} • {request.district}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Blood Group</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{request.bloodGroup}</p>
              </div>
              <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Priority Score</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{request.priorityScore}</p>
              </div>
              <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Hospital</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{request.hospitalName}</p>
              </div>
              <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">District</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{request.district}</p>
              </div>
            </div>
          </div>
        </div>

        {request.aiRecommendation && (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
            <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
              <div className="space-y-4">
                <div className="inline-flex rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
                  AI Recommendation
                </div>
                <h2 className="text-3xl font-bold text-slate-900">{request.aiRecommendation.title || "Urgent match recommended"}</h2>
                <p className="text-slate-600">{request.aiRecommendation.details || request.aiRecommendation}</p>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.75rem] bg-slate-50 p-6 text-slate-900 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Request Type</p>
                  <p className="mt-3 text-lg font-semibold">{request.bloodGroup} • {request.status}</p>
                </div>
                <div className="rounded-[1.75rem] bg-emerald-50 p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Urgency</p>
                  <p className="mt-3 text-lg font-semibold text-emerald-900">{request.priorityScore >= 80 ? "High" : "Standard"}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Requester Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{request.requesterName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{request.requesterPhone}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Donor Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{request.donorName || "Not Assigned"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{request.donorPhone || "Not Assigned"}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Recommended Donors</h2>
          {recommendedDonors.length === 0 ? (
            <p className="text-slate-500">No matching donors found.</p>
          ) : (
            <div className="space-y-5">
              {recommendedDonors.map((donor, idx) => (
                <div key={idx} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <div className="grid gap-4 md:grid-cols-5">
                    <div>
                      <p className="text-sm text-slate-500">Full Name</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">{donor.fullName}</p>
                      {idx === 0 && (
                        <span className="mt-2 inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                          Best Match
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Blood Group</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">{donor.bloodGroup}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">District</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">{donor.district || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Availability</p>
                      <p className="mt-1">
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${donor.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {donor.available ? "Available" : "Unavailable"}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Match Score</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">{donor.matchScore}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default RequestDetails;
