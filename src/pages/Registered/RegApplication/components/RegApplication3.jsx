import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import './RegApplication3.css';

const RegApplication1 = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
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

    useImperativeHandle(ref, () => ({
        handleSubmit,
        validateForm
    }));

    // Modified validateForm function to improve field validation
    const validateForm = () => {
        
        for (let key in formData) {
            // Skip the optional fields based on their name
            if (
                key !== 'fatherSalary' &&
                key !== 'motherSalary' &&
                key !== 'siblingSalary' &&
                key !== 'siblingsElementary' &&
                key !== 'siblingsHighSchool' &&
                key !== 'siblingsCollege' &&
                !formData[key]
            ) {
                alert(`${key.replace(/([A-Z])/g, ' $1').toUpperCase()} is required!`);
                return false; // If a required field is empty, return false
            }
        }
        return true; // All required fields are filled
    };

    useEffect(() => {
        // Load stored form data from local storage if available
        const storedData = JSON.parse(localStorage.getItem("familyData") || '{}');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // If validation fails, stop the form submission
        if (!validateForm()) return;

        // Save form data to local storage after successful validation
        localStorage.setItem("familyData", JSON.stringify(formData));
    };

    return (
        <form className="input-main-container" onSubmit={handleSubmit}>
            {/* Father Section */}
            <div className="input-container-6">
                <div className="input-container-6-1">
                    <label htmlFor="father">Full name of the Father<span className="red">*</span></label>
                    <input 
                        type="text" 
                        name="father" 
                        id="father" 
                        value={formData.father} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-container-6-2">
                    <label htmlFor="fatherOccupation">Occupation<span className="red">*</span></label>
                    <input 
                        type="text" 
                        name="fatherOccupation" 
                        id="fatherOccupation" 
                        value={formData.fatherOccupation} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-container-6-3">
                    <label htmlFor="fatherSalary">Monthly Income/Salary</label>
                    <select 
                        name="fatherSalary" 
                        id="fatherSalary" 
                        value={formData.fatherSalary} 
                        onChange={handleInputChange}
                    >
                        <option value="">Select their monthly salary</option>
                        <option value="10k-20k">10k-20k</option>
                        <option value="30k-40k">30k-40k</option>
                        <option value="50k-60k">50k-60k</option>
                        <option value="70k-80k">70k-80k</option>
                    </select>
                </div>
            </div>

            {/* Mother Section */}
            <div className="input-container-7">
                <div className="input-container-7-1">
                    <label htmlFor="mother">Full name of the Mother<span className="red">*</span></label>
                    <input 
                        type="text" 
                        name="mother" 
                        id="mother" 
                        value={formData.mother} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-container-7-2">
                    <label htmlFor="motherOccupation">Occupation<span className="red">*</span></label>
                    <input 
                        type="text" 
                        name="motherOccupation" 
                        id="motherOccupation" 
                        value={formData.motherOccupation} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-container-7-3">
                    <label htmlFor="motherSalary">Monthly Income/Salary</label>
                    <select 
                        name="motherSalary" 
                        id="motherSalary" 
                        value={formData.motherSalary} 
                        onChange={handleInputChange}
                    >
                        <option value="">Select their monthly salary</option>
                        <option value="10k-20k">10k-20k</option>
                        <option value="30k-40k">30k-40k</option>
                        <option value="50k-60k">50k-60k</option>
                        <option value="70k-80k">70k-80k</option>
                    </select>
                </div>
            </div>

            {/* Sibling Section */}
            <div className="input-container-8">
                <div className="input-container-8-1">
                    <label htmlFor="siblingsWithFamily">How many siblings have their own family?<span className="red">*</span></label>
                    <input 
                        type="number" 
                        name="siblingsWithFamily" 
                        id="siblingsWithFamily" 
                        min="0" 
                        value={formData.siblingsWithFamily} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-container-8-2">
                    <label htmlFor="siblingsWithWork">How many siblings have their own work?<span className="red">*</span></label>
                    <input 
                        type="number" 
                        name="siblingsWithWork" 
                        id="siblingsWithWork" 
                        min="0" 
                        value={formData.siblingsWithWork} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-container-8-3">
                    <label htmlFor="siblingSalary">Monthly Income/Salary</label>
                    <select 
                        name="siblingSalary" 
                        id="siblingSalary" 
                        value={formData.siblingSalary} 
                        onChange={handleInputChange}
                    >
                        <option value="">Select their monthly salary</option>
                        <option value="10k-20k">10k-20k</option>
                        <option value="30k-40k">30k-40k</option>
                        <option value="50k-60k">50k-60k</option>
                        <option value="70k-80k">70k-80k</option>
                    </select>
                </div>
            </div>

            {/* Sibling Education Section */}
            <div className="input-container-9">
                <div className="input-container-9-header">
                    <label>How many siblings are still studying?</label>
                </div>
                <div className="input-container-9-1">
                    <label htmlFor="siblingsElementary">Elementary:</label>
                    <input 
                        type="number" 
                        name="siblingsElementary" 
                        id="siblingsElementary" 
                        min="0" 
                        placeholder="Enter number" 
                        value={formData.siblingsElementary} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-container-9-2">
                    <label htmlFor="siblingsHighSchool">High School:</label>
                    <input 
                        type="number" 
                        name="siblingsHighSchool" 
                        id="siblingsHighSchool" 
                        min="0" 
                        placeholder="Enter number" 
                        value={formData.siblingsHighSchool} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-container-9-3">
                    <label htmlFor="siblingsCollege">College:</label>
                    <input 
                        type="number" 
                        name="siblingsCollege" 
                        id="siblingsCollege" 
                        min="0" 
                        placeholder="Enter number" 
                        value={formData.siblingsCollege} 
                        onChange={handleInputChange} 
                    />
                </div>
            </div>

            {/* Expenses Section */}
            <div className="input-container-10">
                <div className="input-container-10-1">
                    <label htmlFor="electricBill">Amount of pending electricity bill<span className="red">*</span></label>
                    <input 
                        type="text" 
                        name="electricBill" 
                        id="electricBill" 
                        value={formData.electricBill} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-container-10-2">
                    <label htmlFor="waterBill">Amount of pending water bill<span className="red">*</span></label>
                    <input 
                        type="text" 
                        name="waterBill" 
                        id="waterBill" 
                        value={formData.waterBill} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-container-10-3">
                    <label htmlFor="otherExpenses">Amount of pending other bills<span className="red">*</span></label>
                    <input 
                        type="text" 
                        name="otherExpenses" 
                        id="otherExpenses" 
                        value={formData.otherExpenses} 
                        onChange={handleInputChange} 
                    />
                </div>
            </div>

        </form>
    );
});

export default RegApplication1;
