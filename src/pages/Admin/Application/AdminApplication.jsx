import React from "react";

import AdminSidebar from "../common/AdminSidebar/AdminSidebar";
import AdminProfile from "../common/regprofile/regprofile";

import SearchBar from "./components/SearchBar/SearchBar";
import FilterButton from "./components/FilterButton/FilterButton";
import ActionButtons from "./components/ActionButtons/ActionButtons";
import ApplicantTable from "./components/ApplicantTable/ApplicantTable";
import TablePagination from "./components/TablePagination/TablePagination";

import "./AdminApplication.css";

export default function AdminApplication() {
    return (
        <div className="AdminApplicationDiv1">
            {/* Sidebar */}
            <div className="AdminApplicationDiv1-1">
                <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="AdminApplicationDiv1-2">
                {/* Profile Section */}
                <div className="AdminApplicationDiv1-2-1">
                    <AdminProfile />
                </div>

                {/* Main Application Content */}
                <div className="AdminApplicationDiv1-2-2">
                    {/* Header */}
                    <header className="AdminApplicationHeader">
                        <h1>Manage Scholarship Applicants</h1>
                    </header>

                    {/* <div className="AdminApplicationActions">
                        <SearchBar />
                        <FilterButton />
                        <ActionButtons />
                    </div> */}

                    {/* Applicant Table */}
                    <div className="AdminApplicationTableContainer">
                        <ApplicantTable />
                    </div>

                    {/* Pagination */}
                    {/* <div className="AdminApplicationPagination">
                        <TablePagination />
                    </div> */}
                </div>
            </div>
        </div>
    );
}
