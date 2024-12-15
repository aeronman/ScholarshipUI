import React from "react";

import SuperAdminSidebar from "../common/SuperAdminSidebar/SuperAdminSidebar";
import SuperAdminProfile from "../common/regprofile/regprofile";

import SearchBar from "./components/SearchBar/SearchBar";
import FilterButton from "./components/FilterButton/FilterButton";
import ActionButtons from "./components/ActionButtons/ActionButtons";
import ApplicantTable from "./components/ApplicantTable/ApplicantTable";
import TablePagination from "./components/TablePagination/TablePagination";

import "./SuperAdminApplication.css";

export default function SuperAdminApplication() {
    return (
        <div className="SuperAdminApplicationDiv1">
            <div className="SuperAdminApplicationDiv1-1">
                <SuperAdminSidebar />
            </div>

            <div className="SuperAdminApplicationDiv1-2">
                <div className="SuperAdminApplicationDiv1-2-1">
                    <SuperAdminProfile />
                </div>

                <div className="SuperAdminApplicationDiv1-2-2">
                    <header className="SuperAdminApplicationHeader">
                        <h1>Manage Scholarship Applicants</h1>
                    </header>

                 

                    <div className="SuperAdminApplicationTableContainer">
                        <ApplicantTable />
                    </div>

               
                </div>
            </div>
        </div>
    );
}
