import React, { useState } from "react";
import FAQItem from "./FAQItem";

const FAQsList = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is the general qualification of a program?",
            answer: (
                <>
                    The general qualification differs for each program available, they can be <strong>seen in</strong> <strong>the description</strong> of each program which is marked by a <strong>bold font</strong>.
                </>
            )
        },
        {
            question: "What types of scholarships are available?",
            answer: (
                <>
                    There are <strong>7 types</strong> of scholarship programs available:<br />
                    <strong>FASHS</strong> - Financial Assistance for Senior High Scholarship Program<br />
                    <strong>TPKM</strong> - Tulong Pang-edukasyon sa Kabataang Malolenyo<br />
                    <strong>AVSP at ABOSP</strong> - Anak ng Volunteer Scholarship Program at Anak ng Barangay Official Scholarship Program<br />
                    <strong>NMMSP</strong> - Natatanging Mag-aaral na Malolenyo Scholarship Program<br />
                    <strong>VCSP</strong> - Vocational Course Scholarship Program<br />
                    <strong>APKA</strong> - Alalay Paaral sa Kawani at Anak<br />
                    <strong>LMSK</strong> - Natatanging Mag-aaral na Malolenyo Scholarship Program
                </>
            ),
        },
        {
            question: "Do I need to submit any requirements before I receive my scholarship grant?",
            answer: (
                <>
                    <strong>Yes</strong>, there are <strong>general requirements</strong> like electric bills and birth certificates, and <strong>specific requirements</strong> depending on the scholarship.
                </>
            )
        },
        {
            question: "How many days/months can I receive my scholarship grant?",
            answer: (
                <>
                    The timeline for receiving your scholarship can vary, typically ranging from <strong>1 month to 4 months after applying</strong>.
                
                </>
            )
        },
    ];

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            {faqs.map((faq, index) => (
                <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    toggleAnswer={() => toggleAnswer(index)}
                />
            ))}
        </div>
    );
};

export default FAQsList;
