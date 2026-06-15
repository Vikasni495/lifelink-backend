import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Profile() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    bloodGroup: "",
    district: "",
    available: true,
    // backend may or may not provide these
    lastDonationDate: null,
    role: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/api/user/profile");
      setProfile((p) => ({ ...p, ...response.data }));
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setMessage("");
    setError("");
    try {
      setUpdating(true);

      const { phone, bloodGroup, district, available } = profile;

      await api.put("/api/user/profile", {
        phone,
        bloodGroup,
        district,
        available,
      });

      setMessage("✅ Profile Updated Successfully");
      toast.success("Profile updated");
      // refresh profile to pick up any server-side changes
      await loadProfile();
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const avatarLetter = (profile.fullName || profile.email || "")[0]?.toUpperCase() || "U";

  const formatDate = (iso) => {
    if (!iso) return "N/A";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Profile summary card */}
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex items-start gap-4">
            <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 text-4xl font-bold text-sky-700">
              {profile.fullName?.charAt(0)}
            </div>

            <div className="flex-1">
              <div className="text-2xl font-semibold text-slate-900">{profile.fullName || "—"}</div>
              <div className="text-sm text-slate-500">{profile.email || "—"}</div>

              <div className="mt-3 space-y-1 text-sm text-slate-600">
                <div>
                  <span className="font-medium">Blood Group:</span> {profile.bloodGroup || "—"}
                </div>
                <div>
                  <span className="font-medium">District:</span> {profile.district || "—"}
                </div>
                <div>
                  <span className="font-medium">Available for Donation:</span> {profile.available ? "Yes" : "No"}
                </div>
              </div>
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-semibold flex-shrink-0 ${
                profile.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {profile.available ? "Available" : "Unavailable"}
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="mt-1 text-slate-900">{profile.fullName || "—"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="mt-1 text-slate-900">{profile.email || "—"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <input
                  value={profile.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border p-3"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">Blood Group</p>
                <select
                  value={profile.bloodGroup || ""}
                  onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                  className="mt-1 w-full rounded-xl border p-3"
                >
                  <option value="">Select blood group</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>

              <div>
                <p className="text-sm text-slate-500">District</p>
                <input
                  value={profile.district || ""}
                  onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                  className="mt-1 w-full rounded-xl border p-3"
                />
              </div>
            </div>
          </div>

          {/* Donation Information */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Donation Information</h3>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Availability</p>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!profile.available}
                      onChange={(e) => setProfile({ ...profile, available: e.target.checked })}
                    />
                  </label>
                  <p className="text-sm font-medium text-slate-900">{profile.available ? "Available" : "Unavailable"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500">Last Donation Date</p>
                <p className="mt-1 text-slate-900">{profile.lastDonationDate ? formatDate(profile.lastDonationDate) : "No donations yet"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Role</p>
                <p className="mt-1 text-slate-900">{profile.role || "USER"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-800 border border-red-200">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-6 rounded-md bg-green-50 p-4 text-sm text-green-800 border border-green-200">
            {message}
          </div>
        )}

        {/* Update Button */}
        <div className="flex justify-start">
          <button
            onClick={handleUpdate}
            disabled={updating}
            className="rounded-xl bg-sky-600 px-8 py-3 font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
          >
            {updating ? "Updating Profile..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
