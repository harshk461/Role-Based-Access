import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");  // Redirect to login if no user is logged in
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>
        <p className="mb-4">You are logged in as: <strong>{user.role}</strong></p>

        {/* Conditional rendering based on user role */}
        {user.role === "admin" && (
          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <h3 className="font-semibold">Admin Functionality</h3>
            <p>Only visible to Admins. Manage users, settings, etc.</p>
          </div>
        )}

        {user.role === "superAdmin" && (
          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <h3 className="font-semibold">Super Admin Functionality</h3>
            <p>Only visible to SuperAdmins. Manage everything across the platform.</p>
          </div>
        )}

        {user.role === "viewer" && (
          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <h3 className="font-semibold">Viewer Functionality</h3>
            <p>Only visible to Viewers. Limited access to content.</p>
          </div>
        )}

        <button
          className="mt-6 py-2 px-4 bg-red-500 text-white rounded-md"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
