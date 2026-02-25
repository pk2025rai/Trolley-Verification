import React, { useState, useEffect, useRef } from "react";
import { BiBriefcase, BiErrorCircle } from "react-icons/bi";
import {
  FaHome,
  FaUserCog,
  FaCog,
  FaChartLine,
  FaPlane,
  FaViadeo,
  FaBell,
  FaPlaneDeparture,
  FaChartBar,
  FaSlidersH,
} from "react-icons/fa";
import { FaUser, FaUserShield, FaSignOutAlt } from "react-icons/fa";
import { BarcodeIcon, Plane } from "lucide-react";
import { MdIntegrationInstructions, MdSensors } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/Prototype.css";
import clientlogo from "../../assets/clientlogo.png";
import "../styles/analytics.css";

import ing from "../../assets/resoluteai.png";
import adminlogo from "../../assets/adminlogo.png";
// import image from "../../assets/image.png";
import ZodhaGpt from "../../assets/analyticskart.png";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isHamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
  const adminMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const wrapper = document.querySelector(".hamburger-hover-wrapper");
      if (wrapper && !wrapper.contains(event.target)) {
        setHamburgerMenuOpen(false);
      }
      // Close admin menu when clicking outside
      if (
        adminMenuRef.current &&
        !adminMenuRef.current.contains(event.target)
      ) {
        setAdminMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/dashboard/home":
        return "Home";
      case "/dashboard/analytics":
        return "Analytics";
      case "/dashboard/config":
        return "Configuration";
      case "/dashboard/users":
        return "User Management";
      default:
        return "";
    }
  };

  const currentPage = getPageTitle(location.pathname);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-container">
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="logo">
          <img src={ZodhaGpt} alt="ZodhaGpt Logo" />
        </div>

        <nav className="nav-links">
          {/* Nav Links (unchanged) */}
          <NavLink
            to="/dashboard/home"
            end
            className={({ isActive }) =>
              `nav-button ${isActive ? "active" : ""}`
            }
          >
            <FaHome />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/dashboard/analytics"
            end
            className={({ isActive }) =>
              `nav-button ${isActive ? "active" : ""}`
            }
          >
            <FaChartBar />
            <span>Analytics</span>
          </NavLink>
          <NavLink
            to="/dashboard/config"
            end
            className={({ isActive }) =>
              `nav-button ${isActive ? "active" : ""}`
            }
          >
            <FaSlidersH />
            <span>Configuration</span>
          </NavLink>
          <NavLink
            to="/dashboard/users"
            end
            className={({ isActive }) =>
              `nav-button ${isActive ? "active" : ""}`
            }
          >
            <FaUserCog />
            <span>User Management</span>
          </NavLink>
        </nav>

        <div className="footer-logo">
          <p className="powered">Powered by</p>
          <img src={ing} alt="ResoluteAI" />
        </div>
      </div>

      <div className="main-content">
        <header className="app-header">
          <div className="sidebar-toggle-wrapper">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              <div className="toggle-icon"></div>
            </button>
            <div className="current-page-title">
              <h3>{currentPage}</h3>
            </div>
          </div>
          <div className="hamburger-hover-wrapper">
            {/* Hamburger Menu (unchanged) */}
            <button
              className="hamburger-toggle"
              onClick={() => setHamburgerMenuOpen((prev) => !prev)}
            >
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </button>
            {isHamburgerMenuOpen && (
              <div className="hover-nav-card">
                {/* Hamburger Items (unchanged) */}
                <button
                  className="nav-button"
                  onClick={() => {
                    navigate("/dashboard/home");
                    setHamburgerMenuOpen(false);
                  }}
                >
                  <FaHome /> <span>Home</span>
                </button>
              </div>
            )}
          </div>

          <h1>Trolly verification</h1>
          <div className="app-client">
            <img src={clientlogo} alt="Client Logo" />
          </div>

          {/* Admin Logo with Dropdown */}
          <div className="app-logo" ref={adminMenuRef}>
            <img
              src={adminlogo}
              alt="admin Logo"
              className="admin-logo"
              onClick={() => setAdminMenuOpen((prev) => !prev)}
            />
            {isAdminMenuOpen && (
              <div className="admin-dropdown">
                <div className="dropdown-item user-info">
                  <FaUser className="icon" />
                  <span className="arjun">Admin</span>
                </div>

                <div className="dropdown-item admin-label">
                  <BiBriefcase className="icon" />
                  <span className="arjun">Manager</span>
                </div>

                <div className="dropdown-divider"></div>

                <button
                  className="dropdown-item logout-btn"
                  onClick={() => navigate("/")}
                >
                  <FaSignOutAlt className="icon" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="content-body">
          <Outlet />
          <div className="download-actions"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
