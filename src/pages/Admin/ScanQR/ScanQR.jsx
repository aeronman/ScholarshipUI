import React, { useState } from "react";
import jsQR from "jsqr";

const QRScanner = () => {
  const [file, setFile] = useState(null);
  const [userID, setUserID] = useState(null);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [error, setError] = useState(null);

  // Handle file input change (QR code image upload)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        const imgElement = document.createElement("img");
        imgElement.src = reader.result;

        imgElement.onload = () => {
          // Once the image is loaded, extract QR code from the image
          const canvas = document.createElement("canvas");
          canvas.width = imgElement.width;
          canvas.height = imgElement.height;
          const context = canvas.getContext("2d");
          context.drawImage(imgElement, 0, 0);

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code) {
            // Parse the QR code content which should contain "UserID : idnumber"
            const parsedData = code.data.split(":");
            console.log("QR Code Data: ", parsedData); // Log the QR code data to the console
            if (parsedData.length === 2 && parsedData[0].trim() === "UserID") {
              setUserID(parsedData[1].trim());
            } else {
              setError("Invalid QR Code format.");
            }
          } else {
            setError("No QR code detected.");
          }
        };
      };

      reader.readAsDataURL(file);
    }
  };

  // Fetch personal details based on the UserID
  const fetchPersonalDetails = async () => {
    if (!userID) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get/getPersonalDetails.php?userID=${userID}`);
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

  // Trigger fetching personal details after UserID is extracted
  React.useEffect(() => {
    if (userID) {
      fetchPersonalDetails();
    }
  }, [userID]);

  return (
    <div className="qr-scanner">
      <h2>QR Code Scanner</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <div className="error-message">{error}</div>}

      {personalDetails && (
        <div className="personal-details">
          <h3>Personal Details</h3>
          <ul>
            <li><strong>LRN/Student ID:</strong> {personalDetails.data.Student_ID}</li>
            <li><strong>Name:</strong> {personalDetails.data.FIRST_NAME} {personalDetails.data.MIDDLE_NAME} {personalDetails.data.LAST_NAME}</li>
            <li><strong>Address:</strong> {personalDetails.data.STREET_ADDRESS} {personalDetails.data.BARANGAY}, {personalDetails.data.CITY_MUNICIPALITY} {personalDetails.Province}</li>
            <li><strong>Phone:</strong> {personalDetails.data.CONTACT_NO}</li>
            <li><strong>Religion:</strong> {personalDetails.data.RELIGION}</li>
            {/* Add other fields as needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
