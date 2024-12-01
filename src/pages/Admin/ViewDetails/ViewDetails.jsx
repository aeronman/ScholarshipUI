import React, { useState, useEffect } from "react";
import "./ViewDetails.css";
import AdminSidebar from "../common/AdminSidebar/AdminSidebar";
import RegProfile from "../../Registered/common/regprofile/regprofile";
import ApplicantDetails from "./component/ApplicantDetails"
function ViewDetails() {


  return (
    <div className="AdminFeedbackDiv1">
      <div className="AdminFeedbackDiv1-1">
        <AdminSidebar />
      </div>
      <div className="AdminFeedbackDiv1-2">
        <div className="AdminFeedbackDiv1-2-1">
          <RegProfile />
        </div>
        <div className="AdminFeedbackDiv1-2-2">
            
            <ApplicantDetails/>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
