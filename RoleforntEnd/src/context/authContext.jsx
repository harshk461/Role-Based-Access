import { createContext, useState, useContext } from "react";
import axios from "axios";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        return { status: "success" };
      } else {
        return { status: "error", message: "No token received" };
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return {
        status: "error",
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
}
