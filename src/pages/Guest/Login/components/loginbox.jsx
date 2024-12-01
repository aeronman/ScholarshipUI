import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginBox() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            username: formData.username,
            password: formData.password,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/post/userLogin.php`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.message === "Login successful.") {
                const { UserID, Username, UserType, Email , Status, Feedback ,Avatar} = response.data.user;

                // Storing user data in localStorage
                localStorage.setItem("id",UserID);
                localStorage.setItem("status",Status);
                localStorage.setItem("fullname", Username); // Changed to 'fullname'
                localStorage.setItem("usertype", UserType);
                localStorage.setItem("email", Email);
                localStorage.setItem("feedback_given", Feedback);
                localStorage.setItem("avatar",Avatar);

                // Redirecting to the dashboard after successful login

                if(UserType == "Student"){
                    window.location.href = "/regdashboard";
                }
                else if(UserType == "admin"){
                    window.location.href = "/Admin/Dashboard";
                }
                else if(UserType == "superadmin"){
                     window.location.href = "/SuperAdmin/Dashboard";
                }
                
            } else {
                alert(response.data.message); // Displaying login error message
            }
        } catch (error) {
            console.error("There was an error logging in!", error);
            alert("An error occurred during login. Please try again later.");
        }
    };

    return (
        <div className="popUpDiv">
            <img
                src="https://res.cloudinary.com/ddiyjqv0u/image/upload/v1719735599/Ph_seal_bulacan_malolos_400x400_nkfoxm.png"
                alt=""
            />
            <form onSubmit={handleSubmit}>
                <div>
                    <p className="p1">Welcome!</p>
                    <p className="p2">Sign into your Account</p>
                </div>
                <div className="formContent">
                    <div className="login_emailDiv">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="login_emailDiv">
                        <label htmlFor="password">Password</label>
                        <div className="login_passwordContainer">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <span
                                className="login_togglePasswordIcon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>
                    <button
                        className="submit"
                        name="submit"
                        id="submit"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
                <p className="signInP">
                    Don't have an account? <Link className="removeDeco" to="/signup">Sign-up</Link>
                </p>
            </form>
        </div>
    );
}
