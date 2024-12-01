import React from "react"
import Navbar from "../common/Navbar/navbar"
import PopUp from "./components/signupbox"
import Footer from "../common/Footer/footer"
import "./components/signup.css"

export default function SignUp() {
    return (
        <div>
            <Navbar />
            <div className="popUpSuperDiv">
                <PopUp />
            </div>
            <Footer />
        </div>
    )
}