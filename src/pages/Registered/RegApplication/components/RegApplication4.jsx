import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const RegApplication1 = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        lastSchool: "",
        lastCourse: "",
        grades: "",
        numOfUnits: "",
        newSchool: "",
        newCourse: "",
        levelYear: "",
        semester: "",
    });
    
    useImperativeHandle(ref, () => ({
        handleSubmit,
        validateForm
    }));

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("educationalBgData") || '{}');
        if (storedData) {
            setFormData(storedData);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        // List of required fields
        const requiredFields = ['lastSchool', 'lastCourse', 'grades', 'newSchool', 'newCourse', 'semester'];
    
        for (let key of requiredFields) {
            if (!formData[key]) {
                // alert(`${key.replace(/([A-Z])/g, ' $1').toUpperCase()} is required!`);
                return false; // Return false if any required field is empty
            }
        }
    
        return true; // All required fields are filled
    };
    

    const handleSubmit = (e) => {
        e.preventDefault(); 
         // If validation fails, stop the form submission
         if (!validateForm()) return;

        localStorage.setItem("educationalBgData", JSON.stringify(formData)); 
        // alert("Data saved successfully!"); 
    };

    return (
        <div className="input-main-container">
            <form onSubmit={handleSubmit}>
                <div className="input-container-1">
                    <div className="input-container-1-1">
                        <label htmlFor="lastSchool">Last school attended<span className="red">*</span></label>
                        <input 
                            type="text" 
                            name="lastSchool" 
                            id="lastSchool" 
                            value={formData.lastSchool} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-container-1-2">
                        <label htmlFor="lastCourse">Course<span className="red">*</span></label>
                        <input 
                            type="text" 
                            name="lastCourse" 
                            id="lastCourse" 
                            value={formData.lastCourse} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-container-1-3">
                        <label htmlFor="grades">Grades/Marks (General Average)<span className="red">*</span></label>
                        <input 
                            type="text" 
                            name="grades" 
                            id="grades" 
                            value={formData.grades} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>

                <div className="input-container-2">
                    <div className="input-container-2-1">
                        <label htmlFor="numOfUnits">Number of Units (if college)</label>
                        <input 
                            type="text" 
                            name="numOfUnits" 
                            id="numOfUnits" 
                            value={formData.numOfUnits} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-container-2-2">
                        <label htmlFor="newSchool">School about to Attend<span className="red">*</span></label>
                        <input 
                            type="text" 
                            name="newSchool" 
                            id="newSchool" 
                            value={formData.newSchool} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-container-2-3">
                        <label htmlFor="newCourse">Course<span className="red">*</span></label>
                        <input 
                            type="text" 
                            name="newCourse" 
                            id="newCourse" 
                            value={formData.newCourse} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>

                <div className="input-container-3">
                    <div className="input-container-3-1">
                        <label htmlFor="levelYear">Level/Year</label>
                        <input 
                            type="text" 
                            name="levelYear" 
                            id="levelYear" 
                            value={formData.levelYear} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="input-container-3-2">
                        <label htmlFor="semester">Semester<span className="red">*</span></label>
                        <input 
                            type="text" 
                            name="semester" 
                            id="semester" 
                            value={formData.semester} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>

              
            </form>
        </div>
    );
});

export default RegApplication1;
