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
    }));

    const [files, setFiles] = useState(initialState);
    const [previews, setPreviews] = useState(initialState);
    const [modalImage, setModalImage] = useState(null); // state to handle the modal image

    useEffect(() => {
        const storedId = localStorage.getItem("edit_id");
        if (storedId) {
            fetchData(storedId);
        }
    }, []);

    const fetchData = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get/getDocuments.php?userID=${id}`);
            const result = await response.json();
    
            if (result.success) {
                const fetchedData = result.data;

                // Update the form state
                setFiles({
                    ...files,
                    ...fetchedData,
                });
    
                // Update the form state
                setPreviews({
                    ...previews,
                    ...fetchedData,
                });
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Handle file change
    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        const file = selectedFiles[0];

        if (file && file.type.startsWith("image/")) {
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


    const handleSubmit = (e) => {
        e.preventDefault();
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
