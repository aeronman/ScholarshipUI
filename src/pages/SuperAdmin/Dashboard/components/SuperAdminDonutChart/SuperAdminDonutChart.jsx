import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

// Fetch data from the backend
const fetchApplicantData = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get/fetch_donut_chart.php`);
        const data = await response.json();
        if (data.status === "success") {
            return data.data;
        } else {
            throw new Error("Failed to fetch applicant data");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { inProgress: 0, approved: 0, declined: 0 }; // Default in case of error
    }
};

const SuperAdminDonutChart = () => {
    const [applicantData, setApplicantData] = useState({
        inProgress: 0,
        approved: 0,
        declined: 0,
    });

    // Fetch data on component mount
    useEffect(() => {
        const getData = async () => {
            const data = await fetchApplicantData();
            setApplicantData(data);
        };

        getData();
    }, []);

    const totalApplicants = applicantData.inProgress + applicantData.approved + applicantData.declined;

    const data = {
        labels: ["In Progress", "Approved", "Denied"],
        datasets: [
            {
                label: "Applicants Breakdown",
                data: [applicantData.inProgress, applicantData.approved, applicantData.declined],
                backgroundColor: ["#FFB6C1", "#98FB98", "#FF6347"],
                borderColor: ["#FFB6C1", "#98FB98", "#FF6347"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right", // Move legend to the right
                labels: {
                    boxWidth: 20,
                    generateLabels: (chart) => {
                        const dataset = chart.data.datasets[0];
                        return chart.data.labels.map((label, index) => {
                            const value = dataset.data[index];
                            const percentage = ((value / totalApplicants) * 100).toFixed(1);
                            return {
                                text: `${label} (${percentage}%)`,
                                fillStyle: dataset.backgroundColor[index],
                                hidden: false,
                                lineCap: "round",
                                lineDash: [],
                                lineDashOffset: 0,
                                lineJoin: "round",
                                strokeStyle: dataset.borderColor[index],
                                pointStyle: "circle",
                                datasetIndex: 0,
                                index,
                            };
                        });
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw;
                        const percentage = ((value / totalApplicants) * 100).toFixed(1);
                        return `${context.label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    return (
        <div style={{ height: "60%", position: "relative" }}>
            {/* Applicant Status Breakdown */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <h2 style={{ fontWeight: "bold", marginBottom: "10px" }}>Scholarship Application Status Breakdown</h2>
                <p style={{ color: "#6c757d", fontSize: "16px" }}>
                    <strong>Total Applicants:</strong> {totalApplicants} | <strong>In Progress:</strong> {applicantData.inProgress} | <strong>Approved:</strong> {applicantData.approved} | <strong>Denied:</strong> {applicantData.declined}
                </p>
            </div>
            {/* Donut Chart */}
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default SuperAdminDonutChart;
