import React, { useState, useEffect } from "react"
import "./AdminTotalApplicants.css"

// Simulated data fetching function (replace with your actual API or database call)
const fetchApplicants = async () => {
    try {
        const response = await fetch( `${import.meta.env.VITE_SERVER_URL}/get/total_new_applicant.php`);
        const data = await response.json();
        if (data.status === "success") {
            return data.data; // Return the total_scholars count
        } else {
            console.error(data.message);
            return 0; // Default to 0 on error
        }
    } catch (error) {
        console.error("Error fetching scholars:", error);
        return 0; // Default to 0 on error
    }
};

export default function AdminTotalApplicants() {
    const [totalApplicants, setTotalApplicants] = useState(0); // Default value is 0

    useEffect(() => {
        // Fetch the current number of applicants when component mounts
        const getApplicantsData = async () => {
            const data = await fetchApplicants();
            setTotalApplicants(data);
        };

        getApplicantsData();
    }, []); // Empty dependency array means this runs once when the component mounts

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="totalApplicantsDiv">
            <p className="p1">As of <span className="redText">{currentDate}</span></p>
            <p className="p2 redText">{totalApplicants.toLocaleString()}</p>
            <p className="p3">Total no. of New Applicants</p>
        </div>
    );
}
