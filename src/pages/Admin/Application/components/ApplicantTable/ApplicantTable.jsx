import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ApplicantTable.css";
import { useNavigate } from "react-router-dom";

const ApplicantTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from the backend
        const fetchApplicants = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/get/fetch_applicants.php`
                );

                if (response.data.status === "success") {
                    setData(response.data.data);
                } else {
                    throw new Error(response.data.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const handleView = (id) =>{
        localStorage.setItem("view_id",id);
        navigate("/Admin/ViewDetails");
    }
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
                            <td>{row.requirements}</td>
                            <td>{row.email}</td>
                            <td>
                                <button className="ViewMore" onClick={() => handleView(row.userId)}>View More</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantTable;
