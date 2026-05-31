import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await api.get("/plans");
      setPlans(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async (planId) => {
    try {
      await api.post(`/subscribe/${planId}`);
      alert("Subscription successful");

      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Subscription Plans
            </h1>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Choose the perfect plan for your needs and unlock premium
              features.
            </p>
          </div>

          {loading && (
            <div className="text-center text-blue-400 text-lg">
              Loading plans...
            </div>
          )}

          {!loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className="group bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-xl hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Plan Name */}
                  <h2 className="text-2xl font-bold text-white">{plan.name}</h2>

                  {/* Price */}
                  <div className="my-6">
                    <span className="text-5xl font-bold text-white">
                      ${plan.price}
                    </span>

                    <span className="text-gray-400 ml-2">/ month</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <span className="text-blue-400 font-bold">✓</span>

                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    onClick={() => subscribe(plan._id)}
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-lg shadow-blue-500/20"
                  >
                    Subscribe Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Plans;
