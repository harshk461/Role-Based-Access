import { useState, useEffect } from "react";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UpdateModal from '../components/UpdateModal';



export default function Dashboard() {

  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  

  const user = jwtDecode(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Welcome, {user.email}</h2>
          {/* <button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button> */}
          <button
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 cursor-pointer"
            onClick={logout}
          >
            Logout
          </button>
         
        </div>
        <p className="mb-4">
          You are logged in as: <strong>{user.role}</strong>
        </p>

        {/* Conditional rendering based on user role */}
        {user.role === "ADMIN" && (
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg mb-4">
            <h3 className="font-semibold">Admin Functionality</h3>
            <p>Only visible to Admins. Manage users, settings, etc.</p>
          </div>
        )}

        {user.role === "SUPER_ADMIN" && (
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-4">
            <h3 className="font-semibold">Super Admin Functionality</h3>
            <p>
              Only visible to SuperAdmins. Manage everything across the
              platform.
            </p>
            <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 cursor-pointer" onClick={()=>setModal(true)}>
            UPDATE ROLE
          </button>
          <UpdateModal isOpen={modal} onClose={() => setModal(false)}/>
          </div>
        )}

        {user.role === "VIEWER" && (
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg mb-4">
            <h3 className="font-semibold">Viewer Functionality</h3>
            <p>Only visible to Viewers. Limited access to content.</p>
          </div>
        )}
      </div>

      <div className="w-fit m-auto mt-[50px] flex flex-wrap gap-[40px]">
        <Button
          name={"Super Admin Button"}
          path={"/super-admin/manage-users"}
        />
        <Button name={"Viewer Button"} path={"/viewer/"} />
        <Button name={"Admin Button"} path={"/admin/"} />
        <Button name={"Therapist Button"} path={"/therapist/"} />
      </div>
    </div>
  );
}
