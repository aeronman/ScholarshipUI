import React, { useRef, useState, useEffect } from "react";
import "./AdminScholars.css";
import AdminSidebar from "../common/AdminSidebar/AdminSidebar";
import RegProfile from "../../Registered/common/regprofile/regprofile";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faFileExport, faFileAlt, faUserFriends, faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

const Scholars = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [filterModalPosition, setFilterModalPosition] = useState({ top: 0, left: 0 });
  const filterButtonRef = useRef(null);
  const [scholarsData, setScholarsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('id'); // default sort column
  const [sortOrder, setSortOrder] = useState('ascending'); // default sort order
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

  // Filtering scholars data based on the search term
  const filteredData = scholarsData.filter(scholar =>
    scholar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholar.id.toString().includes(searchTerm) ||
    scholar.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholar.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholar.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting filtered data based on sortColumn and sortOrder
  const sortedData = filteredData.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortOrder === 'ascending' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortOrder === 'ascending' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  // Pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Extracting data for the current page
  const currentData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Toggle filter modal visibility
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

  const handleView = (id) => {
    localStorage.setItem("view_id", id);
    navigate("/Admin/ViewDetails");
  };

  const handleEdit = (id) => {
    localStorage.setItem("edit_id", id);
    navigate("/Admin/EditDetails");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);  // Use filteredData here
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Scholars");
    XLSX.writeFile(wb, "scholars.xlsx");
  };
  

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Scholar ID", "Student Name", "Address", "Program","Barangay"]],
      body: filteredData.map(scholar => [  // Use filteredData here
        scholar.id,
        scholar.name,
        scholar.address,
        scholar.program,
        scholar.barangay,
      ]),
    });
    doc.save("scholars.pdf");
  };
  

  // Sorting by column
  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === 'ascending' ? 'descending' : 'ascending';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

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
                <input
                  type="text"
                  placeholder="Search"
                  className="search-bar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="action-buttons">
                <button className="export-btn" onClick={exportToExcel}>
                  <FontAwesomeIcon icon={faFileExport} /> Export to Excel
                </button>
                <button className="report-btn" onClick={exportToPDF}>
                  <FontAwesomeIcon icon={faFileAlt} /> Export to PDF
                </button>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                
                <th onClick={() => handleSort('id')}>
                  Scholar ID <FontAwesomeIcon icon={faSort} />
                </th>
                <th onClick={() => handleSort('name')}>
                  Student Name <FontAwesomeIcon icon={faSort} />
                </th>
                <th onClick={() => handleSort('address')}>
                  Address <FontAwesomeIcon icon={faSort} />
                </th>
                <th onClick={() => handleSort('program')}>
                  Program <FontAwesomeIcon icon={faSort} />
                </th>
                <th onClick={() => handleSort('barangay')}>
                  Barangay <FontAwesomeIcon icon={faSort} />
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((scholar, index) => (
                <tr key={index}>
                  <td>{scholar.id}</td>
                  <td>{scholar.name}</td>
                  <td>{scholar.address}</td>
                  <td>{scholar.program}</td>
                  <td>{scholar.barangay}</td>
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
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active-page" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholars;
