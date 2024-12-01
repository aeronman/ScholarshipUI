
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "./RegApplication6.css";

// For the zoom feature
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const RegApplication1 = forwardRef((props, ref) => {

    const [formData1, setFormData] = useState({
        userID: localStorage.getItem("id"),
        Student_ID: "",
        FIRST_NAME: "",
        MIDDLE_NAME: "",  // Optional field
        LAST_NAME: "",
        DATE_OF_BIRTH: "",
        age: "",
        PLACE_OF_BIRTH: "",
        Province: "Bulacan",
        CITY_MUNICIPALITY: "Malolos",
        BARANGAY: "",
        STREET_ADDRESS: "",
        SEX: "",
        CIVIL_STATUS: "",
        PWD: "",
        RELIGION:"",
        CONTACT_NO: "",
        PWD_ID: null,
        PWDPreview: null
    });



    
    useEffect(() => {
       
            fetchData();
       
    }, []);
    const fetchData = () => {
      
        const storedData = JSON.parse(localStorage.getItem("personalDetails") || '{}');
        
        
            setFormData({
                ...formData1,
                ...storedData
            });
        
    };

    const [formData2, setFormData2] = useState({
        father: "",
        fatherOccupation: "",
        fatherSalary: "",
        mother: "",
        motherOccupation: "",
        motherSalary: "",
        siblingsWithFamily: "",
        siblingsWithWork: "",
        siblingSalary: "",
        siblingsElementary: "",
        siblingsHighSchool: "",
        siblingsCollege: "",
        electricBill: "",
        waterBill: "",
        otherExpenses: ""
    });


    
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("familyData") || '{}');
        if (storedData) {
            setFormData2(storedData);
        }
    }, []);

    const [formData3, setFormData3] = useState({
        userID: localStorage.getItem("id"),
        lastSchool: "",
        lastCourse: "",
        grades: "",
        numOfUnits: "",
        newSchool: "",
        newCourse: "",
        levelYear: "",
        semester: "",
    });
    

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("educationalBgData") || '{}');
        if (storedData) {
            setFormData3(storedData);
        }
    }, []);

    const initialState = {
        bills: "",
        brgyIndigency: "",
        cedula: "",
        socialCase: "",
        form138: "",
        certificateEnrollment: "",
        certificateMembership: "",
        certificateEmployment: "",
    };



    const [previews, setPreviews] = useState(initialState);
    const [modalImage, setModalImage] = useState(null); // state to handle the modal image

    // Load saved files and previews from localStorage
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("documentsData"));
        if (savedData && savedData.files && savedData.previews) {
            setPreviews(savedData.previews);
        }
    }, []);

    

    // Handle image click to open in modal
    const handleImageClick = (image) => {
        setModalImage(image); // set the clicked image to display in the modal
    };

    // Close modal
    const closeModal = () => {
        setModalImage(null);
    };

    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
    
        const formDataToSend = {
            programApplied: localStorage.getItem("program_applied"),
            status: "pending",
            personalDetails: formData1,
            familyData: formData2,
            educationalBgData: formData3,
            documentsData: previews,
        };
    
        try {
            // Send the form data to the server
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/post/updateDatas.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataToSend),
            });
    
            console.log("Response received:", response);
    
            // Parse the JSON response
            const result = await response.json();
            console.log("Parsed result:", result);
    
            if (result.status === "success") {
                // Notify the user of success
                alert("Applicant data has been updated");
    
                // Remove specific items from local storage
                localStorage.removeItem("documentsData");
                localStorage.removeItem("educationalBgData");
                localStorage.removeItem("familyData");
                localStorage.removeItem("personalDetails");
    
               
    
                // Redirect to /regApplication
                window.location.href = "/Admin/Scholars";
            } else {
                // Notify the user of an error
                alert("There was an error submitting your application.");
            }
        } catch (error) {
            // Log and notify the user of any network or other errors
            console.error("Error submitting form:", error);
            alert("There was an error submitting your application.");
        }
    };
    
    
    return (
        <div className="container">
            <div className="review-sections-container">
              
                {/* Personal Information Section */}
                <div className="review-section">
                    <h4>PERSONAL INFORMATION</h4>
                    <div className="data-grid">
                        {[
                            { label: "ID/LRN/School Number", value: formData1.Student_ID },
                            { label: "Date of Birth", value: formData1.DATE_OF_BIRTH },
                            { label: "Age", value: formData1.age },
                            { label: "First Name", value: formData1.FIRST_NAME },
                            { label: "Middle Name", value: formData1.MIDDLE_NAME },
                            { label: "Last Name", value: formData1.LAST_NAME },
                            { label: "Place of Birth", value: formData1.PLACE_OF_BIRTH },
                            { label: "Sex", value: formData1.SEX },
                            { label: "Contact Number", value: formData1.CONTACT_NO },
                            { label: "Province", value: formData1.Province },
                            { label: "City/Municipality", value: formData1.CITY_MUNICIPALITY },
                            { label: "Barangay", value: formData1.BARANGAY },
                            { label: "Street Address", value: formData1.STREET_ADDRESS },
                            { label: "PWD?", value: formData1.PWD === 1 ? "Yes" : formData1.PWD === 0 ? "No" : "N/A" },
                            { label: "Religion", value: formData1.RELIGION },
                            { label: "Civil Status", value: formData1.CIVIL_STATUS },
                        ].map((item, index) => (
                            <div key={index}>
                                <label>{item.label}: </label>
                                <p>{item.value || "N/A"}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Family Information Section */}
                <div className="review-section">
                    <h4>FAMILY INFORMATION</h4>
                    <div className="data-grid">
                        {[
                            { label: "Father's Name", value: formData2.father },
                            { label: "Father's Occupation", value: formData2.fatherOccupation },
                            { label: "Father's Monthly Salary", value: formData2.fatherSalary },
                            { label: "Mother's Name", value: formData2.mother },
                            { label: "Mother's Occupation", value: formData2.motherOccupation },
                            { label: "Mother's Monthly Salary", value: formData2.motherSalary },
                            { label: "Siblings with Family", value: formData2.siblingsWithFamily },
                            { label: "Siblings with Work", value: formData2.siblingsWithWork },
                            { label: "Siblings in Elementary", value: formData2.siblingsElementary },
                            { label: "Siblings in High School", value: formData2.siblingsHighSchool },
                            { label: "Siblings in College", value: formData2.siblingsCollege},
                            { label: "Pending Electric Bill", value: formData2.electricBill},
                            { label: "Pending Water Bill", value: formData2.waterBill },
                            { label: "Other Expenses", value: formData2.otherExpenses },
                        ].map((item, index) => (
                            <div key={index}>
                                <label>{item.label}: </label>
                                <p>{item.value || "N/A"}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Status Section */}
                <div className="review-section">
                    <h4>EDUCATION STATUS</h4>
                    <div className="data-grid">
                        {[
                            { label: "Last School Attended", value: formData3.lastSchool },
                            { label: "Course", value: formData3.lastCourse },
                            { label: "General Average", value: formData3.grades },
                            { label: "Number of Units", value: formData3.numOfUnits },
                            { label: "School About to Attend", value: formData3.newSchool },
                            { label: "Level/Year", value: formData3.levelYear },
                            { label: "Semester", value: formData3.semester },
                        ].map((item, index) => (
                            <div key={index}>
                                <label>{item.label}: </label>
                                <p>{item.value || "N/A"}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Documents Section */}
                <div className="review-section">
                    <h4>DOCUMENTS</h4>
                    <div className="document-container">
           
                    <div className="document-input-section">
                        <div className="document-column scrollable-column">
                            {["bills", "brgyIndigency", "cedula", "socialCase"].map((doc, index) => (
                                <div key={index} className="document-input">
                                    <label htmlFor={doc}>
                                        {doc.replace(/([A-Z])/g, " $1")} <span className="required">*</span>
                                    </label>
                                  
                                    {previews[doc] && (
                                        <div className="image-preview">
                                            <Zoom>
                                                <img
                                                    src={previews[doc]}
                                                    alt="Preview"
                                                    className="preview-image"
                                                    onClick={() => handleImageClick(previews[doc])}
                                                />
                                            </Zoom>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                 
                        <div className="document-column scrollable-column">
                            {["form138", "certificateEnrollment", "certificateMembership", "certificateEmployment"].map(
                                (doc, index) => (
                                    <div key={index} className="document-input">
                                        <label htmlFor={doc}>
                                            {doc.replace(/([A-Z])/g, " $1")} <span className="required">*</span>
                                        </label>
                                        
                                        {previews[doc] && (
                                            <div className="image-preview">
                                                <Zoom>
                                                    <img
                                                        src={previews[doc]}
                                                        alt="Preview"
                                                        className="preview-image"
                                                        onClick={() => handleImageClick(previews[doc])}
                                                    />
                                                </Zoom>
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
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
                
            </div>
                </div>
            </div>
        </div>
    );
});

export default RegApplication1;
