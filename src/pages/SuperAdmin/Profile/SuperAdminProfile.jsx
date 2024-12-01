import React, { useState, useEffect } from "react";
import "./SuperAdminProfile.css"; // Import your CSS styles
import RegSideBar from "../common/SuperAdminSidebar/SuperAdminSidebar";
import RegProfile from "../common/regprofile/regprofile";

const SuperAdminProfile = () => {
  const [avatar, setAvatar] = useState("https://via.placeholder.com/100"); // Initial avatar
  const [editName, setEditName] = useState(false); // Track name edit mode
  const [name, setName] = useState("No Data"); // Profile name state
  const [base64Avatar , setBase64Avatar] = useState(null);

  const [formData, setFormData] = useState({
    email: "No Data",
    linkedin: "N/A",
    phoneNumber: "No Data",
    lastActive: "No Data",
    dateOfBirth: "No Data",
    address: "No Data",
    sex: "No Data",
    civilStatus: "No Data",
    pwd: "No Data",
    religion: "No Data",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("id");
      if (userId) {
        try {
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get/getProfileDataAdmin.php?id=${userId}`);
          const data = await response.json();
          console.log(data);
          if (!data.error) {
            setName(data.FIRST_NAME + " " + data.MIDDLE_NAME + " " + data.LAST_NAME);
            setAvatar(data.profile_picture);
            setFormData({
              email: data.Email,
              phoneNumber: data.CONTACT_NO,
              dateOfBirth: data.DATE_OF_BIRTH,
              address: data.STREET_ADDRESS,
              sex: data.SEX,
              linkedin: "N/A",
              civilStatus: data.CIVIL_STATUS,
              lastActive: "Active Now",
              pwd: data.PWD,
              religion: data.RELIGION,
            });
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const [editMode, setEditMode] = useState({
    detailsAdmin: false,
    personalInfo: false,
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData)); // Save changes immediately
  };

  const saveData = async () => {
    const userId = localStorage.getItem("id");
    if (userId) {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/post/updateProfileAdmin.php`, {
          method: "POST",
          body: JSON.stringify({
            id: userId,
            name,
            formData
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        if (data.success) {
          alert("Profile updated successfully");
        } else {
          alert("Error updating profile");
        }
      } catch (error) {
        console.error('Error saving data:', error);
        alert('Error saving data');
      }
    }
  };
 

// Handle avatar change and convert to base64
const handleAvatarChange = (event) => {
  const file = event.target.files[0];

  // Check if file exists
  if (file) {
    // Check if file size exceeds 16MB
    const maxSize = 4 * 1024 * 1024; // 4MB in bytes
    if (file.size > maxSize) {
      alert("File size must be 4MB or smaller.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newAvatar = e.target.result;
      setAvatar(newAvatar);
      setBase64Avatar(newAvatar);

      // Save the base64 image to local storage
      localStorage.setItem("avatar", newAvatar);
    };
    reader.readAsDataURL(file); // Convert file to base64
  } else {
    alert("No file selected.");
  }
};

useEffect(() => {
  // Avoid running on initial render
  if (base64Avatar) {
    console.log(base64Avatar); // Log when base64Avatar changes
    saveProfilePic();
  }
}, [base64Avatar]);

const saveProfilePic = async () => {
  const userId = localStorage.getItem("id");
  if (userId) {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/post/updateAvatarAdmin.php`, {
        method: "POST",
        body: JSON.stringify({
          id: userId,
          base64Avatar
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (data.success) {
        alert("Profile Picture Updated successfully");
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
  }
};
  const toggleEditMode = (section) => {
    // Toggle the edit mode for the section
    setEditMode((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  
    // If the section is currently being saved, trigger the save process
    if (editMode[section]) {
      saveData();
    }
  };
  

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="regProfile1">
      <div className="regProfile1-1">
        <RegSideBar />
      </div>
      <div className="regProfile1-2">
        <div className="RegApplicationDiv1-2-1">
          <RegProfile />
        </div>
        <div className="profile-container">
          {/* Left Section */}
          <div className="profile-current">
            <div className="profile-card">
              <div className="avatar-container">
                <img
                  src={avatar}
                  alt="Profile Avatar"
                  className="profile-avatar"
                />
                <button
                  className="edit-avatar-button"
                  onClick={() => document.getElementById("avatar-upload").click()}
                >
                  <i className="pencil-icon">&#9998;</i> {/* Unicode pencil icon */}
                </button>
              </div>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
              {/* Name Section */}
              <div className="name-container">
                <button
                  className="edit-name-button"
                  onClick={() => {
                    if (editName) {
                      saveData(); // Call saveData when toggling from edit mode
                    }
                    setEditName(!editName); // Toggle the edit state
                  }}
                >
                  {editName ? "Save" : "Edit"}
                </button>
                {editName ? (
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    className="edit-name-input"
                  />
                ) : (
                  <h1 className="profile-name">{name}</h1>
                )}
              </div>
              <h2 className="profile-id">20204758498</h2>
              <p className="profile-admin">Admin</p>
            </div>

            <div className="details-admin">
              <button
                className="edit-button"
                onClick={() => toggleEditMode("detailsAdmin")}
              >
                {editMode.detailsAdmin ? "Save" : "Edit"}
              </button>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                {editMode.detailsAdmin ? (
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="detail-value">{formData.email}</span>
                )}
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Linkedin:</span>
                {editMode.detailsAdmin ? (
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="detail-value">{formData.linkedin}</span>
                )}
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Phone Number:</span>
                {editMode.detailsAdmin ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="detail-value">{formData.phoneNumber}</span>
                )}
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Last Active:</span>
                {editMode.detailsAdmin ? (
                  <input
                    type="text"
                    name="lastActive"
                    value={formData.lastActive}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="detail-value">{formData.lastActive}</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="details-container">
            <div className="personal-info-admin">
              <button
                className="edit-button"
                onClick={() => toggleEditMode("personalInfo")}
              >
                {editMode.personalInfo ? "Save" : "Edit"}
              </button>
              <h3>Personal Information</h3>
              <div className="detail-item">
                <span className="detail-label">Date of Birth:</span>
                {editMode.personalInfo ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="detail-value">{formData.dateOfBirth}</span>
                )}
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Address:</span>
                {editMode.personalInfo ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="detail-value">{formData.address}</span>
                )}
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Sex:</span>
                {editMode.personalInfo ? (
                  <input
                    type="text"
                    name="sex"
                    value={formData.sex}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="detail-value">{formData.sex}</span>
                )}
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Civil Status:</span>
                {editMode.personalInfo ? (
                  <input
                    type="text"
                    name="civilStatus"
                    value={formData.civilStatus}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="detail-value">{formData.civilStatus}</span>
                )}
              </div>
            
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Religion:</span>
                {editMode.personalInfo ? (
                  <input
                    type="text"
                    name="religion"
                    value={formData.religion}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="detail-value">{formData.religion}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminProfile
