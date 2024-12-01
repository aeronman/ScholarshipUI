import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(localStorage.getItem("usertype") || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = (type) => {
    localStorage.setItem("usertype", type);
    setUserType(type);
    if (type === "Student") {
        navigate("/regdashboard");
    } else if (type === "admin") {
        navigate("/Admin/Dashboard");
    } else if (type === "superadmin") {
        navigate("/SuperAdmin/Dashboard");
    }


  };

  const logout = () => {
    localStorage.removeItem("usertype");
    setUserType(null);
    navigate("/login");
  };

  const checkAuth = async () => {
    const storedUserType = localStorage.getItem("usertype");
    if (!storedUserType) {
      navigate("/login"); 
    } else {
      setUserType(storedUserType);
    }
    setLoading(false);
    return storedUserType;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ userType, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
