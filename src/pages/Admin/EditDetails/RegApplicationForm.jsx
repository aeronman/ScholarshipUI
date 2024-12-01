import React, { useState, useRef } from "react";

import RegSideBar from "../common/AdminSidebar/AdminSidebar";
import RegProfile from "../common/regprofile/regprofile";

;
import RegApplication2 from "./components/RegApplication2";
import RegApplication3 from "./components/RegApplication3";
import RegApplication4 from "./components/RegApplication4";
import RegApplication5 from "./components/RegApplication5";
import RegApplication6 from "./components/RegApplication6";

import "./RegApplicationForm.css";

export default function RegApplication() {
    const regFormRef = useRef(null);

    const [page, setPage] = useState(1);

    const [formData, setFormData] = useState({
        scholarshipProgram: "",
        personalInfo: {},
        familyInfo: {},
        educationStatus: {},
        documents: {}
    });
    
    const formTitles = [
    
        "Personal Information",
        "Family Information",
        "Education Status",
        "Documents",
        "Review"
    ];

    const formTitleDetails = [
    
        "Make sure to answer items marked with * and read each items and answers you input carefully.",
        "Make sure to answer items marked with * and read each items and answers you input carefully.",
        "Make sure to answer items marked with * and read each items and answers you input carefully.",
        "Make sure to answer items marked with * and read each items and answers you input carefully. Please submit a clear picture, scanned copy, or pdf file. Each form accepts multiple files if necessary.",
        "Please make sure that all of the information you input is correct."
    ];

    const pageDisplay = () => {
        if (page === 1) {
            return <RegApplication2 moveToForm={() => setPage(2)} formData={formData} setFormData={setFormData}  ref={regFormRef}/>;
        } else if (page === 2) {
            return <RegApplication3 moveToForm={() => setPage(3)} formData={formData} setFormData={setFormData}  ref={regFormRef}/>;
        } else if (page === 3) {
            return <RegApplication4 moveToForm={() => setPage(4)} formData={formData} setFormData={setFormData}  ref={regFormRef}/>;
        } else if (page === 4) {
            return <RegApplication5 moveToForm={() => setPage(5)} formData={formData} setFormData={setFormData}  ref={regFormRef}/>;
        } else if (page === 5) {
            return <RegApplication6  formData={formData} setFormData={setFormData}  ref={regFormRef} />;
        }
    };
    
    const handleNext = (e) => {
        if (regFormRef.current) {
            regFormRef.current.handleSubmit(e);
        }
        setPage((currPage) => currPage + 1);
        console.log("submitted");
    };

    const handleFinalSubmit = (event) => {
        if (regFormRef.current) {
            regFormRef.current.handleSubmit(event);
        } else {
            console.error("Form reference is not available.");
        }
    };
    
    
    return (
        <div className="RegApplicationDiv1">
            <div className="RegApplicationDiv1-1">
                <RegSideBar />
            </div>
            <div className="RegApplicationDiv1-2">
                <div className="RegApplicationDiv1-2-1">
                    <RegProfile />
                </div>
                <div className="formheader">{formTitles[page]}</div>
                <div className="formheaderDetails">{formTitleDetails[page]}</div>
                <div className="RegApplicationDiv1-2-2">
                    <div className="body">{pageDisplay()}</div>
                </div>
                <div className="footerButton">
                    {/* {page > 1 && (
                        <button
                            onClick={() => setPage((currPage) => currPage - 1)}
                        >
                            Prev
                        </button>
                    )} */}
                    {page < 4 && page !== 0 && (
                       <button onClick={handleNext}>
                       Next
                        </button>
                    )}
                    {page === 4 && (
                         <button onClick={handleNext}>
                         Review
                          </button>
                    )}
                    {page === 5 && (
                        <button onClick={handleFinalSubmit}>Submit</button> // Submit button
                    )}
                </div>
            </div>
        </div>
    );
}
