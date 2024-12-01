import React from "react";

import RegSideBar from "../common/regsidebar/RegSidebar";
import RegProfile from "../common/regprofile/regprofile";
import ApplicationDetailsForm from "./components/ApplicationDetailsForm";
import ApplicationStatus from "./components/ApplicationStatus";
import "./RegStatus.css";

export default function RegStatus() {
    return (
        <div className="RegStatusDiv1">
            <div className="RegStatusDiv1-1">
                <RegSideBar />
            </div>
            <div className="RegApplicationDiv1-2">
                <div className="RegApplicationDiv1-2-1">
                    <RegProfile />
                </div>
                <div className="RegStatusDiv1-2">
                    <div className="RegStatusDiv1-2-1">
        
                    </div>
                    <div className="RegStatusDiv1-2-2">
            
                    </div>
                    <div className="RegStatusDiv1-2-3">
                        <ApplicationStatus />
                        <ApplicationDetailsForm />
                    </div>
                </div>
            </div>
        </div>
    );
}