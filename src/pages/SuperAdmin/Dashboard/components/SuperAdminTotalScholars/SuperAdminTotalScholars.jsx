import React, { useState, useEffect } from "react"
import "./SuperAdminTotalScholars.css"

const fetchScholars = async () => {
    try {
        const response = await fetch( `${import.meta.env.VITE_SERVER_URL}/get/total_scholars.php`); 
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

export default function SuperAdminTotalScholars() {
    const [totalScholars, setTotalScholars] = useState(0); // Default value is 0

    useEffect(() => {
        // Fetch the current number of scholars when component mounts
        const getScholarsData = async () => {
            const data = await fetchScholars();
            setTotalScholars(data);
        };

        getScholarsData();
    }, []); // Empty dependency array means this runs once when the component mounts

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="totalScholarsDiv">
            <p className="p1">As of <span className="redText">{currentDate}</span></p>
            <p className="p2 redText">{totalScholars.toLocaleString()}</p>
            <p className="p3">Total no. of Scholars</p>
        </div>
    );
}
