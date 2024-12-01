import React, { useState, useEffect } from 'react';
import './ApplicationDetailsForm.css';

function ApplicationDetailsForm() {
    const [applicantData, setApplicantData] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchApplicantData = async () => {
            try {
                const userID = localStorage.getItem('id'); // Ensure 'id' is stored in localStorage
                if (!userID) {
                    console.error("No userID found in localStorage.");
                    setLoading(false); // Stop loading
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get/getPersonalDetails.php?userID=${userID}`
                    
                );
                const data = await response.json();

                if (data && !data.message) {
                    setApplicantData(data); // Update the state with the fetched data
                 
                } else {
                    console.error("Error fetching data:", data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false); // Stop loading regardless of success or error
            }
        };

        fetchApplicantData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    if (!applicantData) {
        return <div>No pending application yet.</div>; // Display message if no data
    }
    console.log(applicantData);
    return (
        
        <div className="application-form">
            <h2>Application Details</h2>
            <h4>Personal Information of the Applicant</h4>
            <p>This section displays the applicant's submitted information.</p>

            <div className="form-grid">
                <div className="form-group">
                    <label>ID/School/LRN Number:</label>
                    <p>{applicantData.data.Student_ID}</p>
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <p>{applicantData.data.DATE_OF_BIRTH}</p>
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <p>{applicantData.data.age}</p>
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <p>{applicantData.data.FIRST_NAME}</p>
                </div>
                <div className="form-group">
                    <label>Middle Name:</label>
                    <p>{applicantData.data.MIDDLE_NAME}</p>
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <p>{applicantData.data.LAST_NAME}</p>
                </div>
                <div className="form-group">
                    <label>Place of Birth:</label>
                    <p>{applicantData.data.PLACE_OF_BIRTH}</p>
                </div>
                <div className="form-group">
                    <label>Sex:</label>
                    <p>{applicantData.data.SEX}</p>
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <p>{applicantData.data.CONTACT_NO}</p>
                </div>
                <div className="form-group">
                    <label>Province:</label>
                    <p>{applicantData.data.Province}</p>
                </div>
                <div className="form-group">
                    <label>City/Municipality:</label>
                    <p>{applicantData.data.CITY_MUNICIPALITY}</p>
                </div>
                <div className="form-group">
                    <label>Barangay:</label>
                    <p>{applicantData.data.BARANGAY}</p>
                </div>
                <div className="form-group full-width">
                    <label>Street Address:</label>
                    <p>{applicantData.data.STREET_ADDRESS}</p>
                </div>
                <div className="form-group">
                    <label>PWD?</label>
                    <p>{applicantData.PWD ? 'Yes' : 'No'}</p>
                </div>
                <div className="form-group">
                    <label>Religion:</label>
                    <p>{applicantData.data.RELIGION}</p>
                </div>
                <div className="form-group">
                    <label>Civil Status:</label>
                    <p>{applicantData.data.CIVIL_STATUS}</p>
                </div>
            </div>
        </div>
    );
}

export default ApplicationDetailsForm;
