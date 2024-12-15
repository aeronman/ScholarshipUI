import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination, useFilters, useGlobalFilter, useSortBy } from 'react-table';
import { FaCheck, FaClock, FaTimes, FaFilter, FaSearch, FaFileExport, FaSync, FaGraduationCap } from "react-icons/fa";
import AdminSidebar from "../common/AdminSidebar/AdminSidebar";
import RegProfile from "../../Registered/common/regprofile/regprofile";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import "./AdminStatus.css";

const StatusPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch applicants data
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

  const columns = useMemo(() => [
    
    { Header: 'Student Name', accessor: 'name' },
    { Header: 'Mobile Number', accessor: 'mobile' },
    { Header: 'School Email', accessor: 'email' },
    { Header: 'School', accessor: 'newSchool' },
    { Header: 'Barangay', accessor: 'BARANGAY' },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => {
        switch (value) {
          case "Approved":
            return <span className="status-badge approved"><FaCheck /> Approved</span>;
          case "In Progress":
            return <span className="status-badge in-progress"><FaClock /> In Progress</span>;
          case "Declined":
            return <span className="status-badge declined"><FaTimes /> Declined</span>;
          default:
            return null;
        }
      }
    },
  ], []);

  const filteredData = useMemo(() => {
    return applicants.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [applicants, searchQuery]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    gotoPage,
    pageOptions,
    setPageSize
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Search handling
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Export to Excel
  const exportToExcel = () => {
    const exportData = filteredData.map(row => ({
      'Student Name': row.name,
      'Mobile Number': row.mobile,
      'School Email': row.email,
      'School': row.newSchool,
      'Barangay': row.BARAGAY,
      'Status': row.status,
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applicants");
    XLSX.writeFile(wb, "applicants.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const exportData = filteredData.map(row => [
      row.name,
      row.mobile,
      row.email,
      row.newSchool,
      row.BARAGAY,
      row.status,
    ]);
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Student Name', 'Mobile Number', 'School Email', 'School','Barangay', 'Status']],
      body: exportData,
    });
    doc.save('applicants.pdf');
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
              <input
                type="text"
                placeholder="Search user"
                className="search-bar"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="export-btn" onClick={exportToExcel}>
                <FaFileExport /> Export to Excel
              </button>
              <button className="report-btn" onClick={exportToPDF}>
                <FaFileExport /> Export to PDF
              </button>
            </div>
          </div>
          <div className="table-container">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.length > 0 ? (
                  page.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="no-data">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button onClick={previousPage} disabled={!canPreviousPage}>Previous</button>
            <button onClick={nextPage} disabled={!canNextPage}>Next</button>
            <span>
              Page {pageIndex + 1} of {pageOptions.length}
            </span>
            <select
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 15, 20].map(size => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;


