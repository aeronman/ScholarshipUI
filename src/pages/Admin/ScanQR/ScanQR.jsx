import React, { useEffect, useState } from "react";

const QRScanner = () => {
  const [userID, setUserID] = useState(null);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch personal details based on the UserID
  const fetchPersonalDetails = async (userID) => {
    if (!userID) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get/fetch_view_data.php?view_id=${userID}`);
      const data = await response.json();
      console.log("Personal Details Response: ", data); // Log the response from the PHP backend
      if (data.error) {
        setError(data.error);
      } else {
        setPersonalDetails(data); // Store personal details in state
      }
    } catch (err) {
      setError("Failed to fetch personal details.");
    }
  };

  // Get the UserID from the URL query string when the component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id"); // Extract the 'id' query parameter
    if (userId) {
      setUserID(userId); // Set the userID state
      fetchPersonalDetails(userId); // Fetch the personal details for this userID
    } else {
      setError("User ID not provided in URL.");
    }
  }, []);

  return (
    <div className="qr-scanner">
      <h2>Personal Details</h2>
      {error && <div className="error-message">{error}</div>}

      {personalDetails ? (
        <div className="personal-details">
          <h3>Personal Information</h3>
          <ul>
            <li><strong>Profile Picture:</strong>
            <img src={personalDetails.user.profile_picture} />
            </li>
            <li><strong>LRN/Student ID:</strong> {personalDetails.personal_details.Student_ID}</li>
            <li><strong>Name:</strong> {personalDetails.personal_details.FIRST_NAME} {personalDetails.personal_details.MIDDLE_NAME} {personalDetails.personal_details.LAST_NAME}</li>
            <li><strong>Address:</strong> {personalDetails.personal_details.STREET_ADDRESS} {personalDetails.personal_details.BARANGAY}, {personalDetails.personal_details.CITY_MUNICIPALITY} {personalDetails.personal_details.Province}</li>
            <li><strong>Phone:</strong> {personalDetails.personal_details.CONTACT_NO}</li>
            <li><strong>Religion:</strong> {personalDetails.personal_details.RELIGION}</li>
            {/* Add other fields as needed */}
          </ul>
        </div>
      ) : (
        <p>Loading personal details...</p>
      )}
    </div>
  );
};

export default QRScanner;
