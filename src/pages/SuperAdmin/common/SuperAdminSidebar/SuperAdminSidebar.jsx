import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation hook
import { FaHome, FaFileAlt, FaUserGraduate, FaSignOutAlt, FaTasks, FaCommentDots, FaUserTie, FaUser } from "react-icons/fa"; // React Icons

import "./SuperAdminSidebar.css";

export default function AdminSideBar() {
    const location = useLocation(); // Get the current location

     const handleLogout = () => {
        localStorage.clear(); 
        window.location.href = "/login"; 
    };
    return (
        <div className="SuperAdminsidebarDiv">
            <div className="AdminLogoNameDiv">
                <img src="https://res.cloudinary.com/ddiyjqv0u/image/upload/v1719735599/Ph_seal_bulacan_malolos_400x400_nkfoxm.png" alt="Philippine Seal" />
                <h1>ScholarEase</h1>
            </div>
            <div className="SuperAdminListDiv">
                <span className={location.pathname === "/SuperAdmin/Dashboard" ? "active" : ""}>
                    <FaHome />
                    <Link className="removeDeco" to="/SuperAdmin/Dashboard">Dashboard</Link>
                </span>
                <span className={location.pathname === "/SuperAdmin/Application" ? "active" : ""}>
                    <FaFileAlt />
                    <Link className="removeDeco" to="/SuperAdmin/Application">Application</Link>
                </span>
                <span className={location.pathname === "/SuperAdmin/Status" ? "active" : ""}>
                    <FaTasks />
                    <Link className="removeDeco" to="/SuperAdmin/Status">Status</Link>
                </span>
                <span className={location.pathname === "/SuperAdmin/Scholars" ? "active" : ""}>
                    <FaUserGraduate />
                    <Link className="removeDeco" to="/SuperAdmin/Scholars">Scholars</Link>
                </span>
                <span className={location.pathname === "/SuperAdmin/Admins" ? "active" : ""}>
                    <FaUserTie />
                    <Link className="removeDeco" to="/SuperAdmin/Admins">Admins</Link>
                </span>
                <span className={location.pathname === "/SuperAdmin/Profile" ? "active" : ""}>
                    <FaUser />
                    <Link className="removeDeco" to="/SuperAdmin/Profile">Profile</Link>
                </span>
            </div>
            <div className="SuperAdminListDiv2">
                <hr />
                <span className={location.pathname === "/SuperAdmin/Feedbacks" ? "active" : ""}>
                    <FaCommentDots />
                    <Link className="removeDeco" to="/SuperAdmin/Feedbacks">Feedbacks</Link>
                </span>
                <span onClick={handleLogout} className="logoutButton">
                    <FaSignOutAlt />
                    <span className="removeDeco">Sign Out</span>
                </span>
                <p>ScholarEase @2024</p>
            </div>
        </div>
    );
}
