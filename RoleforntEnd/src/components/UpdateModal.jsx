import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";

export default function UpdateModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [newRole, setNewRole] = useState("ADMIN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      if (user.email == email) {
        toast.error("Don't enter your own email");
        return;
      }

      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:3001/super-admin/find-user",
        {
          headers: { Authorization: "Bearer " + token },
          params: { email: email },
        }
      );

      const data = response.data.user;
      setUserId(data.id);
      setCurrentRole(data.role);
      setLoading(false);
    } catch (err) {
      setError("User not found.");
      setCurrentRole("");
      setUserId(null);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateUserRole = async () => {
    if (!userId) return;

    const token = localStorage.getItem("token");
    setLoading(true); // Ensure loading state is set before request

    try {
      console.log(newRole);
      await toast.promise(
        axios.patch(
          "http://localhost:3001/super-admin/update-user",
          { email, role: newRole },
          { headers: { Authorization: "Bearer " + token } }
        ),
        {
          loading: "Processing...",
          success: "Role updated successfully",
          error: "Failed to update role",
        }
      );

      onClose(); // Close the modal only if the request succeeds
    } catch (err) {
      console.log(err);
      setError("Failed to update role");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white dark:text-black p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Update User Role</h2>

          {/* Search User by Email */}
          <input
            type="email"
            className="w-full p-2 border rounded mb-3"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search User"}
          </button>

          {/* Show Role Dropdown Only If User Found */}
          {currentRole && (
            <div className="mt-4">
              <h1 className="text-md font-semibold">
                Current Log: {currentRole}
              </h1>
              <label className="block">Select New Role:</label>
              <select
                className="w-full p-2 border rounded mt-2"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="VIEWER">Viewer</option>
              </select>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-3 w-full"
                disabled={loading}
                onClick={handleUpdateUserRole}
              >
                {loading ? "Updating..." : "Update Role"}
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          {/* Close Button */}
          <button
            className="mt-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
}

// // Get user by email
// app.get("/api/users", async (req, res) => {
//     const { email } = req.query;
//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   });

//   // Update user role
//   app.put("/api/users/:id/role", async (req, res) => {
//     const { role } = req.body;
//     const user = await User.findByPk(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     user.role = role;
//     await user.save();
//     res.json({ message: "User role updated" });
//   });
