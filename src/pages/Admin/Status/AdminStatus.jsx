import React, { useState,useEffect } from "react";

import "./AdminStatus.css";
import AdminSidebar from "../common/AdminSidebar/AdminSidebar";
import RegProfile from "../../Registered/common/regprofile/regprofile";

// Add FontAwesome icons
import { FaCheck, FaClock, FaTimes, FaFilter, FaSearch, FaFileExport, FaSync } from "react-icons/fa";
import { FaGraduationCap } from 'react-icons/fa';

const StatusPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplicants = applicants.slice(indexOfFirstItem, indexOfLastItem);


  useEffect(() => {
    const fetchApplicantsStatus = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get/fetch_applicants_status.php`);
        const data = await response.json();
        
        if (data.error) {
          console.error("Error fetching data:", data.error);
        } else {
          setApplicants(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchApplicantsStatus();
  }, []);
  

  const nextPage = () => {
    if (currentPage < Math.ceil(applicants.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="status-badge approved">
            <FaCheck className="status-icon" /> Approved
          </span>
        );
      case "In Progress":
        return (
          <span className="status-badge in-progress">
            <FaClock className="status-icon" /> In Progress
          </span>
        );
      case "Declined":
        return (
          <span className="status-badge declined">
            <FaTimes className="status-icon" /> Declined
          </span>
        );
      default:
        return null;
    }
  };
  

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  return (
    <div className="AdminStatus1">
      <div className="AdminStatus1-1">
        <AdminSidebar />
      </div>
      <div className="AdminStatus1-2">
        <div className="AdminStatus1-2-1">
          <RegProfile />
        </div>
        <div className="formTitle">
          <span className="scholarship-status-title">
            <FaGraduationCap className="status-icon" /> Scholarship Status
          </span>
        </div>
        <div className="AdminStatus1-2-2">
          <div className="header-section">
            <div className="search-and-actions">
              <div className="search-bar-container">
                <input type="text" placeholder="Search user" className="search-bar" />
                <FaSearch className="search-icon" />
              </div>
              <div className="action-buttons">
                <button className="filter-btn" onClick={toggleFilterModal}>
                  <FaFilter /> Filter
                </button>
                <button className="export-btn">
                  <FaSync /> Update
                </button>
                <button className="report-btn">
                  <FaFileExport /> Export
                </button>
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Student Name</th>
                <th>Mobile Number</th>
                <th>School Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentApplicants.map((applicant) => (
                <tr key={applicant.UserID}>
                   <td>
                    <input type="checkbox" />
                  </td>
                  <td>{applicant.name}</td>
                  <td>{applicant.mobile}</td>
                  <td>{applicant.email}</td>
                  <td>{getStatusBadge(applicant.status)}</td>
                </tr>
              ))}
            </tbody>
           
          </table>

          <div className="pagination">
            <button onClick={prevPage}>Previous</button>
            <button onClick={nextPage}>Next</button>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="filter-modal">
          <div className="filter-header">
            <h3>Filter Contents</h3>
            <button className="close-btn" onClick={toggleFilterModal}>
              &times;
            </button>
          </div>
          <div className="status-filter-content">
                <div className="status-filter-columns">
                  <div className="status-left-column">
                    <h4>Sort By</h4>
                    <select>
                      <option value="">-- Select a column --</option>
                      <option value="name">Full Name</option>
                      <option value="id">ID</option>
                      <option value="scholarshipProgram">Scholarship Program</option>
                      <option value="scholarshipStatus">Scholarship Status</option>
                    </select>
                    <h5>Include:</h5>
                    <label><input type="checkbox" /> Active phone number</label>
                    <label><input type="checkbox" /> Pending electricity bill</label>
                    <label><input type="checkbox" /> Barangay</label>
                    <label><input type="checkbox" /> City/Municipality</label>
                    <label><input type="checkbox" /> Civil Status</label>
                    <label><input type="checkbox" /> Course</label>
                    <label><input type="checkbox" /> Current Level of Education (Sibling)</label>
                    <label><input type="checkbox" /> Date of Birth</label>
                    <label><input type="checkbox" /> Single parent?</label>
                    <label><input type="checkbox" /> Full name of the Father</label>
                    <label><input type="checkbox" /> Full name of the Mother</label>
                    <label><input type="checkbox" /> Grades/Marks (General Average)</label>
                    <label><input type="checkbox" /> Hobbies and other interests</label>
                    <label><input type="checkbox" /> ID/School/LRN Number</label>
                    <label><input type="checkbox" /> Last school attended</label>
                    <label><input type="checkbox" /> Level/Year</label>
                  </div>
                  <div className="status-right-column">
                    <h4>Order</h4>
                    <select>
                      <option value="ascending">Ascending</option>
                      <option value="descending">Descending</option>
                    </select>
                    <h5>                </h5>
                    <label><input type="checkbox" /> Full Name</label>
                    <label><input type="checkbox" /> Monthly Income/Salary</label>
                    <label><input type="checkbox" /> Name of sibling</label>
                    <label><input type="checkbox" /> Number of Units (if college)</label>
                    <label><input type="checkbox" /> Number of siblings</label>
                    <label><input type="checkbox" /> Number of siblings with own families</label>
                    <label><input type="checkbox" /> Occupation</label>
                    <label><input type="checkbox" /> Other Expenses?</label>
                    <label><input type="checkbox" /> PWD?</label>
                    <label><input type="checkbox" /> Province</label>
                    <label><input type="checkbox" /> Religion</label>
                    <label><input type="checkbox" /> Scholarship Program</label>
                    <label><input type="checkbox" /> School about to Attend</label>
                    <label><input type="checkbox" /> Semester</label>
                    <label><input type="checkbox" /> Sex</label>
                    <label><input type="checkbox" /> Street Address</label>
                    </div>
                </div>
                <button className="status-apply-filter-btn" onClick={toggleFilterModal}>
                  Save
                </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusPage;