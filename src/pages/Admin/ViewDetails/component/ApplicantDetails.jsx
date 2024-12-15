import React, { useState, useEffect, useRef } from "react";
import "./ApplicantDetails.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { QRCodeCanvas as QRCode } from 'qrcode.react';

function ViewDetails() {
  const [loading, setLoading] = useState(true);
  const [applicantData, setApplicantData] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [interviewSchedule, setInterviewSchedule] = useState("");
  const [showInterviewInput, setShowInterviewInput] = useState(false);
  const [submitting, setSubmitting] = useState(false); // Track submission state
  const qrCodeRef = useRef(null); // Reference to the QR Code

  useEffect(() => {
    const fetchData = async () => {
      try {
        const viewID = localStorage.getItem("view_id");
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/get/fetch_view_data.php?view_id=${viewID}`
        );
        const data = await response.json();

        if (data.error) {
          console.error(data.error);
          setApplicantData(null);
        } else {
          setApplicantData(data);
        }
      } catch (error) {
        console.error("Error fetching applicant data:", error);
        setApplicantData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setApplicationStatus(status);
    setShowInterviewInput(status === "For Interview");
  };

  const handleSubmit = async () => {
    setSubmitting(true); // Start submitting

    try {
      const viewID = localStorage.getItem("view_id");

      let qrBase64 = null;

      if (applicationStatus === "Approved") {
        // Generate the QR code as Base64
        const qrCanvas = qrCodeRef.current.querySelector("canvas");
        qrBase64 = qrCanvas.toDataURL("image/png");
      }

      const payload = {
        view_id: viewID,
        application_status: applicationStatus,
        interview_schedule: showInterviewInput ? interviewSchedule : null,
        payout_qr: qrBase64, // Include the QR code if applicable
      };

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/post/update_application_status.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("Application status updated successfully.");
      } else {
        alert("Failed to update application status.");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false); // End submission
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!applicantData) return <div>No pending application yet.</div>;

  const { user, personal_details, family_data, educational_bg_data, documents_data } = applicantData;

  const handleImageClick = (imageSrc) => setModalImage(imageSrc);
  const closeModal = () => setModalImage(null);
  const viewID = localStorage.getItem("view_id");
  const qrValue = `
  Warning:
   - Do not share or distribute the code.  
   - The code confirms the applicant's identity.
   View your details here:
  https://pentatech.vercel.app/QR?id=${user?.UserID}`;

  return (
    <div className="container">
      <div className="review-sections-container">
        {/* Scholarship Program */}
        <div className="review-section">
          <h4>SCHOLARSHIP PROGRAM</h4>
          <p>{user?.program_applied}</p>
        </div>

        {/* Personal Information */}
        <div className="review-section">
          <h4>PERSONAL INFORMATION</h4>
          <div className="data-grid">
            {[
              { label: "ID/LRN/School Number", value: personal_details?.Student_ID },
              { label: "Date of Birth", value: personal_details?.DATE_OF_BIRTH },
              { label: "Age", value: personal_details?.age },
              { label: "First Name", value: personal_details?.FIRST_NAME },
              { label: "Middle Name", value: personal_details?.MIDDLE_NAME },
              { label: "Last Name", value: personal_details?.LAST_NAME },
              { label: "Place of Birth", value: personal_details?.PLACE_OF_BIRTH },
              { label: "Sex", value: personal_details?.SEX },
              { label: "Contact Number", value: personal_details?.CONTACT_NO },
              { label: "Province", value: personal_details?.Province },
              { label: "City/Municipality", value: personal_details?.CITY_MUNICIPALITY },
              { label: "Barangay", value: personal_details?.BARANGAY },
              { label: "Street Address", value: personal_details?.STREET_ADDRESS },
              { label: "PWD?", value: personal_details?.PWD === 1 ? "Yes" : "No" },
              { label: "Religion", value: personal_details?.RELIGION },
              { label: "Civil Status", value: personal_details?.CIVIL_STATUS },
            ].map((item, index) => (
              <div key={index}>
                <label>{item.label}:</label>
                <p>{item.value || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Family Information */}
        <div className="review-section">
          <h4>FAMILY INFORMATION</h4>
          <div className="data-grid">
            {[
              { label: "Father's Name", value: family_data?.father },
              { label: "Father's Occupation", value: family_data?.fatherOccupation },
              { label: "Father's Monthly Salary", value: family_data?.fatherSalary },
              { label: "Mother's Name", value: family_data?.mother },
              { label: "Mother's Occupation", value: family_data?.motherOccupation },
              { label: "Mother's Monthly Salary", value: family_data?.motherSalary },
              { label: "Siblings with Family", value: family_data?.siblingsWithFamily },
              { label: "Siblings with Work", value: family_data?.siblingsWithWork },
              { label: "Pending Electric Bill", value: family_data?.electricBill },
              { label: "Pending Water Bill", value: family_data?.waterBill },
            ].map((item, index) => (
              <div key={index}>
                <label>{item.label}:</label>
                <p>{item.value || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Status */}
        <div className="review-section">
          <h4>EDUCATION STATUS</h4>
          <div className="data-grid">
            {[
              { label: "Last School Attended", value: educational_bg_data?.lastSchool },
              { label: "Course", value: educational_bg_data?.lastCourse },
              { label: "General Average", value: educational_bg_data?.grades },
              { label: "School About to Attend", value: educational_bg_data?.newSchool },
            ].map((item, index) => (
              <div key={index}>
                <label>{item.label}:</label>
                <p>{item.value || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="review-section">
          <h4>DOCUMENTS</h4>
          <div className="document-container">
            {documents_data &&
              Object.entries(documents_data).map(([key, value], index) => {
                if (key === "id" || key === "userID") return null;

                return (
                  <div key={index} className="document-item">
                    <label>{key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:</label>
                    {value ? (
                      <Zoom>
                        <img
                          src={value}
                          alt={key}
                          className="document-image"
                          onClick={() => handleImageClick(value)}
                        />
                      </Zoom>
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Modal for Image Preview */}
        {modalImage && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content">
              <img src={modalImage} alt="Modal Preview" className="modal-image" />
            </div>
          </div>
        )}

        <div className="review-section">
          <h4>UPDATE APPLICATION STATUS</h4>
          <div className="data-grid">
            <div>
              <label>Status:</label>
              <select value={applicationStatus} onChange={handleStatusChange}>
                <option value="">Select Status</option>
                <option value="Verified">Verified</option>
                <option value="For Interview">For Interview</option>
                <option value="Evaluation">Evaluation</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
              </select>
            </div>
            {showInterviewInput && (
              <div>
                <label>Interview Date & Time:</label>
                <input
                  type="datetime-local"
                  value={interviewSchedule}
                  onChange={(e) => setInterviewSchedule(e.target.value)}
                />
              </div>
            )}
          </div>

          {applicationStatus === "Approved" && (
            <div ref={qrCodeRef} style={{ marginTop: "1rem" }}>
              <QRCode value={qrValue} size={128} />
            </div>
          )}

          <button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Updating..." : "Update Status"}
          </button>
          {submitting && <div className="loader">Loading...</div>}
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
