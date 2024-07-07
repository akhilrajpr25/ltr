import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const navigate = useNavigate();

  const login = (username, password) => {
    let isAuthenticated = false;
    if (username === "username" && password === "password") {
      isAuthenticated = true;
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", true);
    } else {
      isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
    }
    return isAuthenticated;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthWrapper };
