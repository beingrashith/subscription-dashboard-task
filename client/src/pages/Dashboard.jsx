import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const [theme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const res = await api.get("/my-subscription");
      setSubscription(res.data);
    } catch (err) {
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        className={`min-h-screen px-4 py-10 ${
          theme === "light"
            ? "bg-white"
            : "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
        }`}
      >
        {" "}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white">My Subscription</h1>
            <p className="text-gray-400 mt-2">
              View and manage your current subscription plan.
            </p>
          </div>

          {loading && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
              <div className="text-blue-400 text-lg">
                Loading subscription...
              </div>
            </div>
          )}

          {!loading && !subscription && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-2">
                No Active Subscription
              </h2>

              <p className="text-gray-400">
                You don't have any active subscription plan yet.
              </p>
            </div>
          )}

          {!loading && subscription && (
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {subscription.plan?.name}
                  </h2>

                  <p className="text-gray-400 mt-1">Active Subscription Plan</p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${
                    subscription.status === "ACTIVE"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  }`}
                >
                  {subscription.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                  <p className="text-gray-400 text-sm mb-2">Start Date</p>

                  <p className="text-white font-semibold text-lg">
                    {new Date(subscription.startDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                  <p className="text-gray-400 text-sm mb-2">End Date</p>

                  <p className="text-white font-semibold text-lg">
                    {new Date(subscription.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
