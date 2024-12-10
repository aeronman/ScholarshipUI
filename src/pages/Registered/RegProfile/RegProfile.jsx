import React, { useState, useEffect } from 'react';
import './RegProfile.css';
import RegSideBar from "../common/regsidebar/RegSidebar";
import RegProfile from "../common/regprofile/regprofile";

const UserProfile = () => {
  const [avatar, setAvatar] = useState("https://via.placeholder.com/100");
  const [userData, setUserData] = useState(null);
  const [base64Avatar , setBase64Avatar] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
     
      const userId = localStorage.getItem("id");
      if (userId) {
        try {
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get/getProfileDatas.php?id=${userId}`);
          const data = await response.json();
          if (!data.error) {
            setUserData(data);
            setAvatar(data.profile_picture);
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts
  useEffect(() => {
    // Avoid running on initial render
    if (base64Avatar) {
      console.log(base64Avatar); // Log when base64Avatar changes
      saveProfilePic();
    }
  }, [base64Avatar]);
  
  if (!userData) {
    return <div>Loading...</div>;
  }
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

  return (
    <div className="regProfile1">
      <div className="regProfile1-1">
        <RegSideBar />
      </div>
      <div className="regProfile1-2">
        <div className="regProfile1-2-1">
          <RegProfile />
        </div>
        <div className="profile-PictureDiv">
          <div className="profilePicture1">
            <div className="profilePicture2">
              <div className="profileAvatarDiv">
                <img
                  src={avatar}
                  alt="Profile Picture"
                  className="profileAvatar"
                />
                <button
                  className="profileAvatar-button"
                  onClick={() => document.getElementById('avatar-upload').click()}
                >
                  <i className="pencil-icon">&#9998;</i>
                </button>
              </div>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <h2 className="profileScholarId">{userData.Student_ID}</h2>
              <h1 className="profileScholarName">{userData.FIRST_NAME} {userData.MIDDLE_NAME}</h1>
              <p className="profileScholarstatus">{userData.newSchool}</p>
            </div>
            <div className="details-section current-school-section">
              <div className="detail-item">
                <span className="detail-label">Current School:</span>
                <span className="detail-value">{userData.newSchool}</span>
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Current Scholarship Program:</span>
                <span className="detail-value">{userData.program_applied}</span>
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Current Application Status:</span>
                <span className="detail-value"><b>{userData.application_status}</b></span>
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Last Active:</span>
                <span className="detail-value">Currently Active</span>
              </div>
            </div>
          </div>

          <div className="details-container">
            <div className="personal-info-section">
              <h3>Personal Information</h3>
              <div className="detail-item">
                <span className="detail-label">Date of Birth:</span>
                <span className="detail-value">{userData.DATE_OF_BIRTH}</span>
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Address:</span>
                <span className="detail-value">{userData.STREET_ADDRESS}</span>
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Sex:</span>
                <span className="detail-value">{userData.SEX}</span>
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Civil Status:</span>
                <span className="detail-value">{userData.CIVIL_STATUS}</span>
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">PWD:</span>
                <span className="detail-value">{userData.PWD}</span>
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Religion:</span>
                <span className="detail-value">{userData.RELIGION}</span>
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Phone Number:</span>
                <span className="detail-value">{userData.CONTACT_NO}</span>
              </div>
            </div>
            <div className="education-status-section">
              <h3>Education Status</h3>
              <div className="detail-item">
                <span className="detail-label">Course:</span>
                <span className="detail-value">{userData.newCourse}</span>
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Number of Units:</span>
                <span className="detail-value">{userData.numOfUnits}</span>
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">General Average:</span>
                <span className="detail-value">{userData.grades}</span>
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Level/Year:</span>
                <span className="detail-value">{userData.levelYear}</span>
              </div>
              <div className="divider-line"></div>
              <div className="detail-item">
                <span className="detail-label">Semester:</span>
                <span className="detail-value">{userData.semester}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
