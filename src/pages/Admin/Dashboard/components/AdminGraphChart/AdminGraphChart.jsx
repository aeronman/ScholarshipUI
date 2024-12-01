import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminGraphChart = () => {
    const data = {
        labels: ["LMSK", "FASHS", "APKA", "VCSP", "AVSP/ABOSP", "TPKM", "NMMMSP"], 
        datasets: [
            {
                label: "Total Funds Utilized",
                data: [800000, 600000, 400000, 900000, 500000, 300000, 200000],
                backgroundColor: [
                    "rgba(255, 182, 193, 0.7)", // LMSK 
                    "rgba(152, 251, 152, 0.7)", // FASHS 
                    "rgba(255, 99, 71, 0.7)",   // APK 
                    "rgba(135, 206, 235, 0.7)", // VCSP 
                    "rgba(255, 160, 122, 0.7)", // AVSP/ABOSP 
                    "rgba(240, 230, 140, 0.7)", // TPKM
                    "rgba(221, 160, 221, 0.7)"  // NMMMSP
                ],
                borderColor: [
                    "rgba(255, 182, 193, 1)", // LMSK 
                    "rgba(152, 251, 152, 1)", // FASHS 
                    "rgba(255, 99, 71, 1)",   // APK
                    "rgba(135, 206, 235, 1)", // VCSP 
                    "rgba(255, 160, 122, 1)", // AVSP/ABOSP 
                    "rgba(240, 230, 140, 1)", // TPKM 
                    "rgba(221, 160, 221, 1)"  // NMMMSP
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Total Funds Utilized per Scholarship Program",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "SCHOLARSHIP PROGRAMS", // Label under x-axis
                    font: {
                        size: 15,
                        weight: "bold",

                    },
                    color: "#6c757d", // Gray color for consistency
                    align: "center", // Aligns the label at the center
                    position: "end", // Position label closer to the chart
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "FUNDS (PHP)", // Optional: Add a y-axis label for clarity
                    font: {
                        size: 15,
                        weight: "bold",
                    },
                    color: "#6c757d", // Gray color for consistency
                },
            },
        },
    };

    return (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ fontWeight: "bold", marginBottom: "10px" }}>Scholarship Funds Utilized</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default AdminGraphChart;
