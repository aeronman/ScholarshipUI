import React from "react"
import "./footer.css"

export default function Footer() {
    return (
        <div className="footerDiv">
            <div className="footerLeftContent">
                <h2>ScholarEase</h2>
                <p>Get scholarships and achieve your education goals</p>
            </div>
            <div className="footerMiddleContent">
                <a href="">Home</a>
                <a href="">Scholarships</a>
                <a href="">About Us</a>
                <a href="">Contact Us</a>
            </div>
            <div className="footerRightContent">
                <p>Find us:</p>
                <div id="contacts">
                    <a href="https://www.linkedin.com" target="_blank" class="linkedin"><img src="https://res.cloudinary.com/ddiyjqv0u/image/upload/v1719826368/2048px-LinkedIn_icon.svg_sevuwz.png" alt="" /></a>
                    <a href="https://www.facebook.com" target="_blank" class="fb"><img src="https://res.cloudinary.com/ddiyjqv0u/image/upload/v1719826388/2023_Facebook_icon_zc8l6q.svg" alt="" /></a>
                    <a href="https://www.instagram.com" target="_blank" class="fb"><img src="https://res.cloudinary.com/ddiyjqv0u/image/upload/v1719826395/2048px-Instagram_logo_2016.svg_nr2yls.png" alt="" /></a>
                </div>
                <p>ScholarEase © 2024</p>
            </div>
        </div>
    )
}