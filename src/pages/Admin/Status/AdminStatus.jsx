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
    {
      Header: 'Select',
      accessor: 'UserID',
      Cell: ({ row }) => (
        <input type="checkbox" />
      )
    },
    {
      Header: 'Student Name',
      accessor: 'name'
    },
    {
      Header: 'Mobile Number',
      accessor: 'mobile'
    },
    {
      Header: 'School Email',
      accessor: 'email'
    },
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

  const data = useMemo(() => applicants, [applicants]);

  // Table Hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
    setPageSize,
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    gotoPage,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 9 },
      manualPagination: true,
      pageCount: Math.ceil(applicants.length / 9)
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Search handling
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setGlobalFilter(e.target.value || undefined);
  };

  // Export to Excel (using filtered data)
  const exportToExcel = () => {
    const filteredData = rows.map(row => row.values);
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applicants");
    XLSX.writeFile(wb, "applicants.xlsx");
  };

  // Export to PDF (using filtered data)
  const exportToPDF = () => {
    const filteredData = rows.map(row => row.values);
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Student Name', 'Mobile Number', 'School Email', 'Status']],
      body: filteredData.map(item => [
        item.name,
        item.mobile,
        item.email,
        item.status
      ])
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
              <div className="search-bar-container">
                <input
                  type="text"
                  placeholder="Search user"
                  className="search-bar"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="action-buttons">
                <button className="export-btn" onClick={exportToExcel}>
                  <FaFileExport /> Export to Excel
                </button>
                <button className="report-btn" onClick={exportToPDF}>
                  <FaFileExport /> Export to PDF
                </button>
              </div>
            </div>
          </div>

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
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {Math.ceil(applicants.length / pageSize)}
              </strong>
            </span>
            <div className="pagination-select">
              <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
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
    </div>
  );
};

export default StatusPage;
