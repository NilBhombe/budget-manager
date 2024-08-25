import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div style={{ position: "fixed", top: "0", right: "0" }}>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
