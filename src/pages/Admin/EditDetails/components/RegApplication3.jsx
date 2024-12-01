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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));
    useEffect(() => {
        const storedId = localStorage.getItem("edit_id");
        if (storedId) {
            fetchData(storedId);
        }
    }, []);

    const fetchData = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get/getFamilyData.php?userID=${id}`);
            const result = await response.json();
    
            if (result.success) {
                const fetchedData = result.data;
    
           
    
                // Update the form state
                setFormData({
                    ...formData,
                    ...fetchedData,
                });
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

      
        localStorage.setItem("familyData", JSON.stringify(formData));
        
        // alert("Data saved successfully!");
    };

    return (
        <form className="input-main-container" onSubmit={handleSubmit}>
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
                        <option value="monthly">Select their monthly salary</option>
                        <option value="10k-20k">10k-20k</option>
                        <option value="30k-40k">30k-40k</option>
                        <option value="50k-60k">50k-60k</option>
                        <option value="70k-80k">70k-80k</option>
                    </select>
                </div>
            </div>

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
                        <option value="monthly">Select their monthly salary</option>
                        <option value="10k-20k">10k-20k</option>
                        <option value="30k-40k">30k-40k</option>
                        <option value="50k-60k">50k-60k</option>
                        <option value="70k-80k">70k-80k</option>
                    </select>
                </div>
            </div>

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
                        <option value="monthly">Select their monthly salary</option>
                        <option value="10k-20k">10k-20k</option>
                        <option value="30k-40k">30k-40k</option>
                        <option value="50k-60k">50k-60k</option>
                        <option value="70k-80k">70k-80k</option>
                    </select>
                </div>
            </div>

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
                    <label htmlFor="otherExpenses">Other Expenses<span className="red">*</span></label>
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
