import React, { useEffect, useState } from "react";
import "./ApplicationStatus.css";

const initialSteps = [
  { label: "Application Form", status: "upcoming" },
  { label: "Verification", status: "upcoming" },
  { label: "Interview Scheduled", status: "upcoming" },
  { label: "Interview", status: "upcoming" },
  { label: "Result", status: "upcoming" },
  { label: "Payout", status: "upcoming" },
];

function ApplicationStatus() {
  const [steps, setSteps] = useState(initialSteps);
  const [error, setError] = useState(null);
  const [qrCode, setQrCode] = useState(null); // State for the QR code URL

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        // Get UserID from localStorage
        const userID = localStorage.getItem("id");
        if (!userID) throw new Error("UserID not found in localStorage");

        // Fetch application status and user data (including payout_qr) from the backend
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/get/getStatus.php?userID=${userID}`
        );
        if (!response.ok) throw new Error("Failed to fetch application status");
        const data = await response.json();

        const { application_status, payout_qr } = data; // Destructure payout_qr from the response

        // Update steps based on application_status
        const updatedSteps = initialSteps.map((step) => ({ ...step }));

        let currentIndex = -1;

        if (application_status === "pending") {
          currentIndex = 1;
        } else if (application_status === "Verified") {
          currentIndex = 2;
        } else if (application_status === "For Interview") {
          currentIndex = 3;
        } else if (application_status === "Evaluation") {
          currentIndex = 4;
        } else if (application_status === "Approved") {
          currentIndex = 5;
          // If approved and QR code is available, set it
          if (payout_qr) {
            setQrCode(payout_qr); // Set the QR code URL from the backend
          }
        } else if (application_status === "Declined") {
          setError("Application declined");
          return;
        }

        // Update statuses in the steps array
        updatedSteps.forEach((step, index) => {
          if (index < currentIndex) {
            step.status = "completed";
          } else if (index === currentIndex) {
            step.status = "current";
          } else {
            step.status = "upcoming";
          }
        });

        setSteps(updatedSteps);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchApplicationStatus();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="application-status">
      {steps.map((step, index) => (
        <div key={index} className={`status-step ${step.status}`}>
          <div className="status-icon">
            {step.status === "completed" ? "✔️" : step.status === "current" ? "🔴" : "⚪️"}
          </div>
          <div className="status-info">
            <div className="status-label">{step.label}</div>
          </div>
        </div>
      ))}

      {qrCode && (
        <div className="qr-code-section">
          <h3>Your Payout QR Code</h3>
          <img src={qrCode} alt="Payout QR Code" className="qr-code-image" />
          <a href={qrCode} download="Payout_QR_Code.png" className="download-button">
            Download QR Code
          </a>
        </div>
      )}
    </div>
  );
}

export default ApplicationStatus;
