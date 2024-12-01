import React from "react";

import SuperAdminSidebar from "../common/SuperAdminSidebar/SuperAdminSidebar";
import SuperAdminProfile from "../common/regprofile/regprofile";
import SuperAdminTotalScholars from "./components/SuperAdminTotalScholars/SuperAdminTotalScholars";
import SuperAdminTotalApplicants from "./components/SuperAdminTotalApplicants/SuperAdminTotalApplicants";
import SuperAdminMission from "./components/SuperAdminMission/SuperAdminMission";
import SuperAdminLineChart from "./components/SuperAdminLineChart/SuperAdminLineChart";
import SuperAdminDonutChart from "./components/SuperAdminDonutChart/SuperAdminDonutChart";
import SuperAdminGraphChart from "./components/SuperAdminGraphChart/SuperAdminGraphChart";

import "./SuperAdminDashboard.css";

export default function AdminDashboard() {
    return (
        <div className="SuperAdminDashboardDiv1">
            {/* Sidebar */}
            <div className="SuperAdminDashboardDiv1-1">
                <SuperAdminSidebar />
            </div>

            {/* Main Content */}
            <div className="SuperAdminDashboardDiv1-2">
                {/* Profile Section */}
                <div className="SuperAdminDashboardDiv1-2-1">
                    <SuperAdminProfile />
                </div>

                {/* Scholars, Applicants, Mission */}
                <div className="SuperAdminDashboardDiv1-2-2">
                    <div className="SuperAdminDashboardDiv1-2-2-1">
                        <div className="SuperAdminDashboardDiv1-2-2-1-1">
                            <SuperAdminTotalScholars />
                        </div>
                        <div className="SuperAdminDashboardDiv1-2-2-1-1">
                            <SuperAdminTotalApplicants />
                        </div>
                    </div>
                    <div className="SuperAdminDashboardDiv1-2-2-2">
                        <SuperAdminMission />
                    </div>
                </div>

                {/* Donut and Graph Chart Section */}
                <div className="SuperAdminDashboardCharts">
                    <div className="DonutGraphWrapper">
                        <div className="SuperAdminDonutChartContainer">
                            <SuperAdminDonutChart />
                        </div>
                        <div className="SuperAdminGraphChartContainer">
                            <SuperAdminGraphChart />
                        </div>
                    </div>

                    {/* Line Chart Section */}
                    <div className="LineChartContainer">
                        <SuperAdminLineChart />
                    </div>
                </div>
            </div>
        </div>
    );
}
