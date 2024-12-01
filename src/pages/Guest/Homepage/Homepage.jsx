import React from "react"
import Navbar from "../common/Navbar/navbar"
import Header from "./components/header"
import Body from "./components/body"
import Footer from "../common/Footer/footer"
import "./components/homepage.css"

export default function HomePage() {
    return (
        <div class="parentDiv">
            <Navbar />
            <Header />
            <Body />
            <Footer />
        </div>
    )
}