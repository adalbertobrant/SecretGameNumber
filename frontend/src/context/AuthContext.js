import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Set up axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/users/profile`
          );
          if (response.data.success) {
            setUser(response.data.data.user);
            setToken(savedToken);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/login`,
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        const { user, token } = response.data.data;
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        toast.success("Login successful!");
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      const code = error.response?.data?.code;

      if (code === "DB_NOT_CONFIGURED" || code === "DB_NOT_CONNECTED") {
        toast.warning("Database not available. You can still play as guest!");
      } else {
        toast.error(message);
      }
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/register`,
        {
          name,
          email,
          password,
        }
      );

      if (response.data.success) {
        const { user, token } = response.data.data;
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        toast.success("Registration successful!");
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      const code = error.response?.data?.code;

      if (code === "DB_NOT_CONFIGURED" || code === "DB_NOT_CONNECTED") {
        toast.warning("Database not available. You can still play as guest!");
      } else {
        toast.error(message);
      }
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    toast.info("Logged out successfully");
  };

  const updateGameStats = async (won, attempts) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/users/game-stats`,
        {
          won,
          attempts,
        }
      );

      if (response.data.success) {
        setUser((prevUser) => ({
          ...prevUser,
          gameStats: response.data.data.gameStats,
        }));
      }
    } catch (error) {
      console.error("Failed to update game stats:", error);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateGameStats,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
