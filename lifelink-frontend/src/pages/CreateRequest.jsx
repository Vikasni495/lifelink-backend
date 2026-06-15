import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function CreateRequest() {
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [district, setDistrict] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [urgency, setUrgency] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/api/request/create", {
        patientName,
        bloodGroup,
        hospitalName,
        district,
        contactNumber,
        urgency,
      });

      toast.success("Request created");
      navigate("/my-requests");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create request");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-slate-900">Create Blood Request</h1>
          <p className="mt-3 text-slate-500">Submit an emergency blood request and notify nearby donors.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Patient Name</span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              type="text"
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Blood Group</span>
            <select
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="">Select Blood Group</option>
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

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Hospital Name</span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              type="text"
              placeholder="Hospital Name"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">District</span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              type="text"
              placeholder="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Contact Number</span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              type="text"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Urgency</span>
            <select
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <option value="">Select Urgency</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="CRITICAL">🔴 CRITICAL</option>
            </select>
          </label>

          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-2xl bg-sky-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-sky-700"
            >
              Create Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRequest;
