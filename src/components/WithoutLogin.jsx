import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const WithoutLogin = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/transactions");
    }
  }, []);
  return <>{children}</>;
};
