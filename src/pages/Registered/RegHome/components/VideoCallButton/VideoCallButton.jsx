import React from "react";
import { useNavigate } from "react-router-dom";
import "./VideoCallButton.css";

export default function VideoCallButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/Admin/regInterview", { state: { applicantEmail: "applicant@example.com" } }); // Replace with dynamic email
    };

    return (
        <button className="video-call-button" onClick={handleClick}>
            <i className="fa fa-video-camera"></i>
        </button>
    );
}
