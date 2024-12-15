import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For table support in jsPDF
import "./ApplicantTable.css";
import { useNavigate } from "react-router-dom";

// Global Search Input Component
const GlobalSearch = ({ globalFilter, setGlobalFilter }) => (
  <input
    value={globalFilter || ""}
    onChange={(e) => setGlobalFilter(e.target.value || undefined)}
    placeholder="Search..."
    style={{ margin: "10px", padding: "5px" }}
  />
);

const ApplicantTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

  const columns = useMemo(
    () => [
      
      { Header: "LRN/School Number", accessor: "lrn" },
      { Header: "Student Name", accessor: "name" },
      { Header: "Submitted Requirements", accessor: "requirements" },
      { Header: "School Email", accessor: "email" },
      { Header: "Barangay", accessor: "BARANGAY" },
      { Header: "School", accessor: "newSchool" },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <button
            className="ViewMore"
            onClick={() => handleView(row.original.userId)}
          >
            View More
          </button>
        ),
      },
    ],
    []
  );

  // React Table hooks setup (with Global Filter and Pagination)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Use `page` instead of `rows` for pagination
    prepareRow,
    setGlobalFilter,
    state: { globalFilter, pageIndex, pageSize },
    gotoPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    useGlobalFilter,
    usePagination
  );

  const handleView = (id) => {
    localStorage.setItem("view_id", id);
    navigate("/Admin/ViewDetails");
  };

  // Export to Excel
  const exportToExcel = () => {
    const filteredData = page.map((row) => row.values); // Extract only the current page data
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applicants");
    XLSX.writeFile(wb, "applicants.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const filteredData = page.map((row) => row.values); // Extract only the current page data
    const doc = new jsPDF();
    doc.autoTable({
      head: [[
        "LRN/School Number",
        "Student Name",
        "Submitted Requirements",
        "School Email",
        "Barangay",
      ]],
      body: filteredData.map((row) => [
        row.lrn,
        row.name,
        row.requirements,
        row.email,
        row.BARANGAY,
        row.newSchool,
      ]),
    });
    doc.save("applicants.pdf");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="TableContainer">
      <div>
        <GlobalSearch
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <button className="export-button" onClick={exportToExcel}>
          Export to Excel <i className="fa fa-download"></i>
        </button>
        <button className="export-button" onClick={exportToPDF}>
          Export to PDF <i className="fa fa-download"></i>
        </button>
      </div>

      <table {...getTableProps()} className="display ApplicantTable">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
        <span>
          Page <strong>{pageIndex + 1} of {pageCount}</strong>
        </span>
        <span>
          | Go to page: 
          <input
            type="number"
            value={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 30].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ApplicantTable;
