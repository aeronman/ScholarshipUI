import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const [formData, setFormData] = useState({
        Username: "",
        email: "",
        password: "",
        signUpConfirmPass: "",
        agree: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Basic validation
        if (!formData.agree) {
            alert("You must agree to the terms and conditions");
            return;
        }
        if (formData.password !== formData.signUpConfirmPass) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/post/userRegister.php`, {
                Username: formData.Username,
                email: formData.email,
                password: formData.password
            });
    
            // Log the response to see its structure
            console.log(response);
    
            // Access response data safely and display the message
            if (response.data && response.data.message) {
                alert(response.data.message);
            } else {
                alert("Unexpected response format.");
            }
    
            if (response.data.message === "User registered successfully.") {
                // Store user info in localStorage
                localStorage.setItem("fullname", formData.Username);
                localStorage.setItem("usertype", "Student"); // Assuming 'Student' as the default user type

                // Redirect to login page after successful registration
                navigate("/login");
            }
        } catch (error) {
            console.error("There was an error registering the user!", error);
            alert("An error occurred during registration. Please try again later.");
        }
    };

    return (
        <div className="popUpDiv">
            <img 
                src="https://res.cloudinary.com/ddiyjqv0u/image/upload/v1719735599/Ph_seal_bulacan_malolos_400x400_nkfoxm.png" 
                alt="Logo" 
            />
            <form onSubmit={handleSubmit}>
                <div>
                    <p className="p1">Welcome!</p>
                    <p className="p2">Sign up For An Account</p>
                </div>
                <div className="formContent">
                    <div className="signup_usernameDiv">
                            <label htmlFor="Username">Username</label>
                            <input 
                                type="text" 
                                name="Username" 
                                id="Username" 
                                value={formData.Username} 
                                onChange={handleChange} 
                            />
                    </div>
                    <div className="signup_emailDiv">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="signup_passDiv">
                        <div className="d1-1">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="d2">
                            <label htmlFor="signUpConfirmPass">Confirm Password</label>
                            <input 
                                type="password" 
                                name="signUpConfirmPass" 
                                id="signUpConfirmPass" 
                                value={formData.signUpConfirmPass} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className="termsDiv">
                        <input 
                            type="checkbox" 
                            name="agree" 
                            id="agree" 
                            checked={formData.agree} 
                            onChange={handleChange} 
                        />
                        <label htmlFor="agree">I agree to the <a href="">Terms and Conditions</a></label><br />
                    </div>
                    <button className="submit" name="submit" id="submit" type="submit">Submit</button>
                </div>
                <p className="signInP">
                    Already have an account? <Link className="removeDeco" to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}
