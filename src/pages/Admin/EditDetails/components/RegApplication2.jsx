
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "./RegApplicationCommon.css";

const RegApplication1 = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
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
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get/getPersonalDetails.php?userID=${id}`);
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
    

    const validateForm = () => {
        for (let key in formData) {
            if (!formData[key] && key !== 'PWDPreview' && key !== 'PWD_ID') {  // Skip PWD fields from required check
                // alert(`${key} is required!`);
                return false;
            }
        }
        return true;
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "DATE_OF_BIRTH") {
            const age = calculateAge(value);
            setFormData({ ...formData, [name]: value, age: age.toString() });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                PWD_ID: file,
                PWDPreview: URL.createObjectURL(file), // Generate preview URL for the file
            });
        }
    };

    const handleSubmit = (e) => {
        console.log("fakk");
        e.preventDefault();
        if (!validateForm()) return;
        
        const dataToStore = {
            ...formData,
            page: "personalInfo",
            PWD: formData.PWD === "Yes" ? 1 : 0, // Convert "Yes" and "No" to boolean
        };

        // Save form data to localStorage
        localStorage.setItem("personalDetails", JSON.stringify(dataToStore));

        // alert("Personal data saved successfully!");
    };

    return (
        <form className="input-main-container" onSubmit={handleSubmit}>
            <div className="input-container-1">
                <div className="input-container-1-1">
                    <label className="applicationLabel" htmlFor="Student_ID">ID/LRN/School Number<span className="red">*</span></label>
                    <input type="text" name="Student_ID" id="Student_ID" value={formData.Student_ID} onChange={handleChange} required />
                </div>
                <div className="input-container-1-2">
                    <label className="applicationLabel" htmlFor="FIRST_NAME">First Name<span className="red">*</span></label>
                    <input type="text" name="FIRST_NAME" id="FIRST_NAME" value={formData.FIRST_NAME} onChange={handleChange} required />
                </div>
                <div className="input-container-1-3">
                    <label className="applicationLabel" htmlFor="MIDDLE_NAME">Middle Name</label>
                    <input type="text" name="MIDDLE_NAME" id="MIDDLE_NAME" value={formData.MIDDLE_NAME} onChange={handleChange} />
                </div>
                <div className="input-container-1-4">
                    <label className="applicationLabel" htmlFor="LAST_NAME">Last Name<span className="red">*</span></label>
                    <input type="text" name="LAST_NAME" id="LAST_NAME" value={formData.LAST_NAME} onChange={handleChange} required />
                </div>
            </div>

            <div className="input-container-2">
                <div className="input-container-2-1">
                    <label className="applicationLabel" htmlFor="DATE_OF_BIRTH">Date of Birth<span className="red">*</span></label>
                    <input type="date" name="DATE_OF_BIRTH" id="DATE_OF_BIRTH" value={formData.DATE_OF_BIRTH} onChange={handleChange} required />
                </div>
                <div className="input-container-2-2">
                    <label className="applicationLabel" htmlFor="age">Age</label>
                    <input type="text" name="age" id="age" value={formData.age} readOnly />
                </div>
                <div className="input-container-2-3">
                    <label className="applicationLabel" htmlFor="SEX">Gender<span className="red">*</span></label>
                    <div id="SEX">
                        <div className="radioDiv">
                            <input type="radio" name="SEX" id="male" value="Male" checked={formData.SEX === "Male"} onChange={handleChange} required />
                            <label className="applicationLabel" htmlFor="male">Male</label>
                            <input type="radio" name="SEX" id="female" value="Female" checked={formData.SEX === "Female"} onChange={handleChange} required />
                            <label className="applicationLabel" htmlFor="female">Female</label>
                        </div>
                    </div>
                </div>
                <div className="input-container-2-4">
                    <label className="applicationLabel" htmlFor="PLACE_OF_BIRTH">Place Of Birth<span className="red">*</span></label>
                    <input type="text" name="PLACE_OF_BIRTH" id="PLACE_OF_BIRTH" value={formData.PLACE_OF_BIRTH} onChange={handleChange} required />
                </div>
            </div>

            <div className="input-container-3">
            <div className="input-container-3-1">
                    <label className="applicationLabel" htmlFor="CONTACT_NO">Contact Number<span className="red">*</span></label>
                    <input type="text" name="CONTACT_NO" id="CONTACT_NO" value={formData.CONTACT_NO} onChange={handleChange} required />
                </div>
                <div className="input-container-3-2">
                    <label className="applicationLabel" htmlFor="PROVINCE">Province</label>
                    <input type="text" name="Province" id="Province" value={formData.Province} readOnly />
                </div>
                <div className="input-container-3-3">
                    <label className="applicationLabel" htmlFor="CITY_MUNICIPALITY">City/Municipality</label>
                    <input type="text" name="CITY_MUNICIPALITY" id="CITY_MUNICIPALITY" value={formData.CITY_MUNICIPALITY} readOnly />
                </div>
                <div className="input-container-3-3">
                    <label className="applicationLabel" htmlFor="BARANGAY">Barangay<span className="red">*</span></label>
                    <select name="BARANGAY" id="BARANGAY" value={formData.BARANGAY} onChange={handleChange} required>
                        <option value="">Select Barangay</option>
                        <option value="Anilao">Anilao</option>
                        <option value="Atlag">Atlag</option>
                        <option value="Babatnin">Babatnin</option>
                        <option value="Bagna">Bagna</option>
                        <option value="Bagong Bayan">Bagong Bayan</option>
                        <option value="Balayong">Balayong</option>
                        <option value="Balite">Balite</option>
                        <option value="Bangkal">Bangkal</option>
                        <option value="Barihan">Barihan</option>
                        <option value="Bulihan">Bulihan</option>
                        <option value="Bungahan">Bungahan</option>
                        <option value="Caingin">Caingin</option>
                        <option value="Calero">Calero</option>
                        <option value="Caliligawan">Caliligawan</option>
                        <option value="Canalate">Canalate</option>
                        <option value="Caniogan">Caniogan</option>
                        <option value="Catmon">Catmon</option>
                        <option value="Cofradia">Cofradia</option>
                        <option value="Dakila">Dakila</option>
                        <option value="Guinhawa">Guinhawa</option>
                        <option value="Liang">Liang</option>
                        <option value="Ligas">Ligas</option>
                        <option value="Longos">Longos</option>
                        <option value="Look 1st">Look 1st</option>
                        <option value="Look 2nd">Look 2nd</option>
                        <option value="Lugam">Lugam</option>
                        <option value="Mabolo">Mabolo</option>
                        <option value="Mambog">Mambog</option>
                        <option value="Masile">Masile</option>
                        <option value="Matimbo">Matimbo</option>
                        <option value="Mojon">Mojon</option>
                        <option value="Namayan">Namayan</option>
                        <option value="Niugan">Niugan</option>
                        <option value="Pamarawan">Pamarawan</option>
                        <option value="Panasahan">Panasahan</option>
                        <option value="Pinagbakahan">Pinagbakahan</option>
                        <option value="San Agustin">San Agustin</option>
                        <option value="San Gabriel">San Gabriel</option>
                        <option value="San Juan">San Juan</option>
                        <option value="San Pablo">San Pablo</option>
                        <option value="Santiago">Santiago</option>
                        <option value="Santisima Trinidad">Santisima Trinidad</option>
                        <option value="Santo Cristo">Santo Cristo</option>
                        <option value="Santo Niño">Santo Niño</option>
                        <option value="Santor">Santor</option>
                        <option value="Santo Rosario">Santo Rosario</option>
                        <option value="San Vicente">San Vicente</option>
                        <option value="Sumapang Bata">Sumapang Bata</option>
                        <option value="Sumapang Matanda">Sumapang Matanda</option>
                        <option value="Taal">Taal</option>
                        <option value="Tikay">Tikay</option>
                    </select>
                </div>
            </div>
    

            <div className="input-container-4">
                <div className="input-container-4-1">
                        <label className="applicationLabel" htmlFor="STREET_ADDRESS">Street Address<span className="red">*</span></label>
                        <input type="text" name="STREET_ADDRESS" id="STREET_ADDRESS" value={formData.STREET_ADDRESS} onChange={handleChange} required />
                </div>
            </div>
            <div className="input-container-5">
                <div className="input-container-5-1">
                    <label className="applicationLabel" htmlFor="CIVIL_STATUS">Civil Status<span className="red">*</span></label>
                    <select name="CIVIL_STATUS" id="CIVIL_STATUS" onChange={handleChange} required>
                        <option value="">Select Civil Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Legally Separated">Legally Separated</option>
                    </select>
                </div>
                <div className="input-container-5-2">
                    <label className="applicationLabel" htmlFor="RELIGION">Religion<span className="red">*</span></label>
                    <input type="text" name="RELIGION" id="RELIGION" value={formData.RELIGION} onChange={handleChange} required />
                </div>
            <div className="input-container-5-3">
                <label className="applicationLabel" htmlFor="PWD">PWD<span className="red">*</span></label>
                <select
                    name="PWD"
                    id="PWD"
                    value={String(formData.PWD)}  // Ensure formData.PWD is always treated as a string
                    onChange={(e) => handleChange({ target: { name: 'PWD', value: e.target.value } })} // Update formData.PWD
                    required
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
            </div>

    {/* Conditional rendering for PWD ID file upload */}
    {formData.PWD === "1" && (
        <div className="input-container-5-2">
            <label className="applicationLabel" htmlFor="PWD_ID">PWD ID</label>
            <input
                type="file"
                name="PWD_ID"
                id="PWD_ID"
                onChange={handleFileChange}
                required
            />
            {formData.PWDPreview && <img src={formData.PWDPreview} alt="PWD ID Preview" />}
        </div>
    )}
</div>


           
        </form>
    );
});

export default RegApplication1;