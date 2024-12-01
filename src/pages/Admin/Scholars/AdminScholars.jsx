import React, { useRef, useState , useEffect } from "react";
import "./AdminScholars.css";
import AdminSidebar from "../common/AdminSidebar/AdminSidebar";
import RegProfile from "../../Registered/common/regprofile/regprofile";
import { useNavigate } from "react-router-dom";
// Add FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faFileExport, faFileAlt, faUserFriends, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";

const Scholars = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [filterModalPosition, setFilterModalPosition] = useState({ top: 0, left: 0 });
  const filterButtonRef = useRef(null);
  const [scholarsData, setScholarsData] = useState([]);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarsData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get/fetch_scholars.php`);
        const data = await response.json();
        setScholarsData(data);
      } catch (error) {
        console.error("Error fetching scholar data:", error);
      }
    };

    fetchScholarsData();
  }, []);

const totalPages = Math.ceil(scholarsData.length / rowsPerPage);

const paginate = (pageNumber) => setCurrentPage(pageNumber);

const currentData = scholarsData.slice(
  (currentPage - 1) * rowsPerPage,
  currentPage * rowsPerPage
);

const toggleFilterModal = () => {
  if (!isFilterModalOpen && filterButtonRef.current) {
    const buttonRect = filterButtonRef.current.getBoundingClientRect();
    const containerRect = document.querySelector(".AdminSholars1-2-2").getBoundingClientRect();

    setFilterModalPosition({
      top: buttonRect.bottom - containerRect.top + 5,
      left: buttonRect.left - containerRect.left,
    });
  }
  setFilterModalOpen(!isFilterModalOpen);
};
const handleView = (id) =>{
  localStorage.setItem("view_id",id);
  navigate("/Admin/ViewDetails");
}
const handleEdit = (id) =>{
  localStorage.setItem("edit_id",id);
  navigate("/Admin/EditDetails");
}

return (
  <div className="AdminSholars1">
    <div className="AdminSholars1-1">
      <AdminSidebar />
    </div>
    <div className="AdminSholars1-2">
      <div className="AdminSholars1-2-1">
        <RegProfile />
      </div>
      <div className="formTitle">
        <FontAwesomeIcon icon={faUserFriends} />
        <span>Scholars</span>
      </div>
      <div className="AdminSholars1-2-2">
      <div className="header-section">
        <div className="search-and-actions">
          <div className="search-bar-container">
            <input type="text" placeholder="Search user" className="search-bar" />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
          <div className="action-buttons">
            <button className="filter-btn">
              <FontAwesomeIcon icon={faFilter} /> Filter
            </button>
            <button className="export-btn">
              <FontAwesomeIcon icon={faFileExport} /> Export
            </button>
            <button className="report-btn">
              <FontAwesomeIcon icon={faFileAlt} /> Report
            </button>
          </div>
        </div>
      </div>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Scholar ID</th>
              <th>Student Name</th>
              <th>Address</th>
              <th>Program</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((scholar, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{scholar.id}</td>
                <td>{scholar.name}</td>
                <td>{scholar.address}</td>
                <td>{scholar.program}</td>
                <td>
                  <button className="view-btn" onClick={() => handleView(scholar.user_id)}>
                    <FontAwesomeIcon icon={faEye} /> View
                  </button>
                  <button className="edit-btn" onClick={() => handleEdit(scholar.user_id)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active-page" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {isFilterModalOpen && (
        <div
          className="filter-modal"
          style={{
            top: `${filterModalPosition.top}px`,
            left: `${filterModalPosition.left}px`,
          }}
        >
          <div className="filter-header">
            <h3>Filter Contents</h3>
            <button className="close-btn" onClick={toggleFilterModal}>
              &times;
            </button>
          </div>
          <div className="filter-content">
            {/* Filter options go here */}
            <button className="apply-filter-btn" onClick={toggleFilterModal}>
              Save
            </button>
              </div>
              <div className="filter-content">
                <div className="filter-columns">
                  <div className="left-column">
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
                  <div className="right-column">
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
                <button className="apply-filter-btn" onClick={toggleFilterModal}>
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
  
  );
};

export default Scholars;
