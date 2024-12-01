import React from "react";
import { Link, useLocation } from "react-router-dom"; // Use useLocation hook for active link highlighting
import { FaHome, FaFileAlt, FaUser, FaTasks, FaSignOutAlt, FaCommentDots } from "react-icons/fa"; // React Icons
import { useNavigate } from "react-router-dom"; // Use navigate for programmatic navigation

import "./regsidebar.css";

export default function RegSideBar() {
    const navigate = useNavigate();
    const location = useLocation(); // Get current location

    const handleSignOut = () => {
        localStorage.clear(); 
        window.location.href = "/login"; 
      
    };
    

    return (
        <div className="sidebarDiv">
            <div className="regLogoNameDiv">
                <img src="https://res.cloudinary.com/ddiyjqv0u/image/upload/v1719735599/Ph_seal_bulacan_malolos_400x400_nkfoxm.png" alt="Philippine Seal" />
                <h1>ScholarEase</h1>
            </div>
            <div className="regListDiv">
                <span className={location.pathname === "/regdashboard" ? "active" : ""}>
                    <FaHome />
                    <Link className="removeDeco" to="/regdashboard">Dashboard</Link>
                </span>
                <span className={location.pathname === "/regApplication" ? "active" : ""}>
                    <FaFileAlt />
                    <Link className="removeDeco" to="/regApplication">Application</Link>
                </span>
                <span className={location.pathname === "/regStatus" ? "active" : ""}>
                    <FaTasks />
                    <Link className="removeDeco" to="/regStatus">Status</Link>
                </span>
                <span className={location.pathname === "/regProfile" ? "active" : ""}>
                    <FaUser />
                    <Link className="removeDeco" to="/regProfile">Profile</Link>
                </span>
            </div>
            <div className="regListDiv2">
                <hr />
                <span className={location.pathname === "/regFeedbacks" ? "active" : ""}>
                    <FaCommentDots />
                    <Link className="removeDeco" to="/regFeedbacks">Feedbacks</Link>
                </span>
                <span onClick={handleSignOut} className="logoutButton">
                    <FaSignOutAlt />
                    <span className="removeDeco">Sign Out</span>
                </span>
                <p>ScholarEase @2024</p>
            </div>
        </div>
    );
}
