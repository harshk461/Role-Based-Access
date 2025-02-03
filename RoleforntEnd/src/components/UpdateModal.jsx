import { useState } from "react";
import axios from "axios";


export default function UpdateModal({isOpen, onClose}) {  
    const [email, setEmail] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [newRole, setNewRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);


const handleSearch = async () => {
  try {
    setLoading(true);
    setError("");
    const response = axios.get('/user?email=${email}');
    const data = response.data;
    setUserId(data.id);
    setCurrentRole(data.role);
    setLoading(false);
  } catch (err) {
    setError("User not found.");
    setCurrentRole("");
    setUserId(null);
  }
  setLoading(false);
};
const handleUpdateUserRole=async ()=>{
    if(!userId)return
    try{
        await axios.put('users/${userId}/role',{role:newRole});
        alert("role updated successfully");
        onClose();
    }catch(err){
       setError("failed to update role")
    }
    setLoading(false);
}
return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
                onClick={handleUpdateUserRole}
                disabled={loading}
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