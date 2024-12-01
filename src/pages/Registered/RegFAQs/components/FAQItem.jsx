import React, { useState, useRef, useEffect } from "react";
import "./FAQItem.css";

const ArrowIcon = ({ isOpen }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
    >
        <path d="M7 10l5 5 5-5H7z" fill="#fff" />
    </svg>
);

const FAQItem = ({ question, answer, isOpen, toggleAnswer }) => {
    const answerRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setHeight(answerRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isOpen]);

    return (
        <div className={`faq-item ${isOpen ? "active" : ""}`}>
            <div className="faq-question" onClick={toggleAnswer}>
                <h3>{question}</h3>
                <ArrowIcon isOpen={isOpen} />
            </div>
            <div
                className="faq-answer"
                ref={answerRef}
                style={{
                    transform: isOpen ? "translateY(0)" : `translateY(-10px)`,
                    height: isOpen ? `${height}px` : "0px",
                    padding: isOpen ? "10px 0" : "0",
                }}
            >
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default FAQItem;
