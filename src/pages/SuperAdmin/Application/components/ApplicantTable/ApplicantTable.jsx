import React from "react";
import "./ApplicantTable.css";

const data = [
    {
        lrn: "202123123",
        name: "Elijah B. Dela Cruz",
        email: "elijah.b.delacruz@gmail.com",
        requirements: ["Certificate of Enrollment", "Form 138", "Barangay Indigency"],
    },
    {
        lrn: "202259595",
        name: "John H. Doe",
        email: "john.h.doe@gmail.com",
        requirements: ["Certificate of Enrollment", "Form 138"],
    },
];

const ApplicantTable = () => {
    return (
        <div className="TableContainer">
            <table className="ApplicantTable">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>LRN/School Number</th>
                        <th>Student Name</th>
                        <th>Submitted Requirements</th>
                        <th>School Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>{row.lrn}</td>
                            <td>{row.name}</td>
                            <td>{row.requirements.join(", ")}</td>
                            <td>{row.email}</td>
                            <td>
                                <button className="ViewMore">View More</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantTable;
