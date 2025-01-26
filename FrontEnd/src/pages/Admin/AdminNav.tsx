import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./AdminNav.css"

export function AdminNav() {
  return (
    <header className="nav-container fixed-header">
      <div className="top-bar">
        <div className="logo">
          <img src={logo} alt="Admin Logo" />
        </div>
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="nav-link">
            Dashboard
          </Link>
          <button 
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin/login";
            }}
            className="logout-btn"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}