import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <div className="flex gap-6">
        <Link to="/plans">Plans</Link>
        <Link to="/dashboard">Dashboard</Link>

        {user?.role === "ADMIN" && (
          <Link to="/admin/subscriptions">Subscriptions</Link>
        )}
      </div>

      <div className="flex gap-4 items-center">
        <span className="text-sm text-gray-300">
          {user?.name || "User"}
        </span>

        <button
          onClick={logout}
          className="bg-white text-black px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;