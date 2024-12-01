import React from "react"

import Navbar from "../common/Navbar/navbar"
import Footer from "../common/Footer/footer"
import LoginBox from "./components/loginbox"
import "./components/login.css"

export default function Login() {
    return (
        <div>
            <Navbar />
            <div className="popUpSuperDiv">
                <LoginBox />
            </div>
            <Footer />
        </div>
    )
}