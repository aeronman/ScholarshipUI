import React from "react";

import RegSideBar from "../common/regsidebar/RegSidebar";
import RegProfile from "../common/regprofile/regprofile";
import FAQsList from "./components/FAQsList";
import "./RegFAQs.css";

export default function RegFAQs() {

    const FAQsTitle = ["Frequently Asked Questions (FAQs)"];

    return (
        <div className="FAQsDiv1">
            <div className="FAQsDiv1-1">
                <RegSideBar />
            </div>
            <div className="FAQsDiv1-2">
                <div className="FAQsDiv1-2-1">
                    <RegProfile />
                </div>
                <div className="FAQsTitle">{FAQsTitle}</div>
                <div className="FAQsDiv1-2-2">
                    <FAQsList /> {/* Render FAQsList here */}
                </div>
                <div className="FAQsDiv1-2-3">
                    <h2>Can't find what you're looking for?</h2>
                    <p>
                        If you have any questions, you may{" "}
                        <a href="/contacts" className="contact-link">Contact Us</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
