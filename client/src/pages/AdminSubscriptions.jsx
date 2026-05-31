import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await api.get("/admin/subscriptions");
      setSubscriptions(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  {
    loading && <div>Loading subscriptions...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white">All Subscriptions</h1>

            <p className="text-gray-400 mt-2">
              Monitor all active subscriptions across the platform.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-gray-400 text-sm">Total Subscriptions</p>

              <p className="text-3xl font-bold text-white mt-2">
                {subscriptions.length}
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-gray-400 text-sm">Active</p>

              <p className="text-3xl font-bold text-green-400 mt-2">
                {subscriptions.filter((sub) => sub.status === "ACTIVE").length}
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-gray-400 text-sm">Expired</p>

              <p className="text-3xl font-bold text-red-400 mt-2">
                {subscriptions.filter((sub) => sub.status !== "ACTIVE").length}
              </p>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="text-left px-6 py-4 text-gray-300">User</th>

                    <th className="text-left px-6 py-4 text-gray-300">Email</th>

                    <th className="text-left px-6 py-4 text-gray-300">Plan</th>

                    <th className="text-left px-6 py-4 text-gray-300">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-gray-300">
                      End Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {subscriptions.map((sub) => (
                    <tr
                      key={sub._id}
                      className="border-t border-gray-800 hover:bg-gray-800/40 transition"
                    >
                      <td className="px-6 py-4 text-white">
                        {sub.userId?.name}
                      </td>

                      <td className="px-6 py-4 text-gray-300">
                        {sub.userId?.email}
                      </td>

                      <td className="px-6 py-4 text-white">
                        {sub.planId?.name}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            sub.status === "ACTIVE"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-300">
                        {new Date(sub.endDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {subscriptions.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                No subscriptions found.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSubscriptions;
