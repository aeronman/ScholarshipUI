import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "./RegApplication5.css";

// For the zoom feature
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const RegApplication1 = forwardRef((props, ref) => {
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
    useImperativeHandle(ref, () => ({
        handleSubmit,
        validateForm
    }));

    const [files, setFiles] = useState(initialState);
    const [previews, setPreviews] = useState(initialState);
    const [modalImage, setModalImage] = useState(null); // state to handle the modal image
    const [formError, setFormError] = useState(""); // To store error message

    const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB in bytes

    // Load saved files and previews from localStorage
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("documentsData"));
        if (savedData && savedData.files && savedData.previews) {
            setFiles(savedData.files);
            setPreviews(savedData.previews);
        }
    }, []);

    // Handle file change
    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        const file = selectedFiles[0];

        // Check if the file is an image
        if (file && file.type.startsWith("image/")) {
            // Check if the file size is within the allowed limit (4MB)
            if (file.size > MAX_FILE_SIZE) {
                alert("File size should be 4MB or less.");
                return;
            }

            // Convert image to Base64 using FileReader
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFiles((prevState) => ({
                    ...prevState,
                    [name]: base64String,
                }));
                setPreviews((prevState) => ({
                    ...prevState,
                    [name]: base64String,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a valid image file.");
        }
    };

    // Validate form
    const validateForm = () => {
        const requiredFields = [
            "bills", "brgyIndigency", "cedula", "socialCase",
            "form138", "certificateEnrollment", "certificateMembership", "certificateEmployment"
        ];

        for (let field of requiredFields) {
            if (!files[field]) {
                setFormError(`${field.replace(/([A-Z])/g, " $1")} is required!`);
                return false;
            }
        }
        setFormError(""); // Clear error if all fields are filled
        return true;
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form before proceeding
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        const dataToSave = { files, previews };
        localStorage.setItem("documentsData", JSON.stringify(dataToSave));
        // alert("Documents saved successfully!");
    };

    // Handle image click to open in modal
    const handleImageClick = (image) => {
        setModalImage(image); // set the clicked image to display in the modal
    };

    // Close modal
    const closeModal = () => {
        setModalImage(null);
    };

    return (
        <div className="application-page">
            <div className="document-container">
                <form onSubmit={handleSubmit}>
                    <div className="document-input-section">
                        {/* Scrollable section for the left documents */}
                        <div className="document-column scrollable-column">
                            {["bills", "brgyIndigency", "cedula", "socialCase"].map((doc, index) => (
                                <div key={index} className="document-input">
                                    <label htmlFor={doc}>
                                        {doc.replace(/([A-Z])/g, " $1")} <span className="required">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        name={doc}
                                        id={doc}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        required
                                    />
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

                        {/* Scrollable section for the right documents */}
                        <div className="document-column scrollable-column">
                            {["form138", "certificateEnrollment", "certificateMembership", "certificateEmployment"].map(
                                (doc, index) => (
                                    <div key={index} className="document-input">
                                        <label htmlFor={doc}>
                                            {doc.replace(/([A-Z])/g, " $1")} <span className="required">*</span>
                                        </label>
                                        <input
                                            type="file"
                                            name={doc}
                                            id={doc}
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            required
                                        />
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

                    {/* Error message display */}
                    {formError && <div className="form-error">{formError}</div>}

                    {/* Modal for Image Preview */}
                    {modalImage && (
                        <div className="modal" onClick={closeModal}>
                            <div className="modal-content">
                                <img src={modalImage} alt="Modal Preview" className="modal-image" />
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
});

export default RegApplication1;
