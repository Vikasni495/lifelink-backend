import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/admin/users");
      setUsers(response.data || []);
    } catch (error) {
      console.error("Failed to load users", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (userId, available) => {
    try {
      await api.put(`/api/admin/users/${userId}/availability`, {
        available: !available,
      });
      toast.success("User availability updated");
      loadUsers();
    } catch (error) {
      console.error("Failed to update availability", error);
      toast.error("Failed to update availability");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-200">
        <h1 className="text-3xl font-semibold text-slate-900">Manage Users</h1>
        <p className="mt-2 text-slate-500">Review all users and update donor availability.</p>
      </div>

      <div className="rounded-[2rem] bg-white p-6 shadow-xl border border-slate-200 overflow-x-auto">
        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading users...</div>
        ) : (
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Blood Group</th>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">Available</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-4 text-slate-900">{user.fullName}</td>
                  <td className="px-4 py-4 text-slate-500">{user.email}</td>
                  <td className="px-4 py-4 text-slate-500">{user.role || "USER"}</td>
                  <td className="px-4 py-4 text-slate-500">{user.bloodGroup || "—"}</td>
                  <td className="px-4 py-4 text-slate-500">{user.district || "—"}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${user.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {user.available ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleAvailability(user.id, user.available)}
                      className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      Set {user.available ? "Unavailable" : "Available"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
