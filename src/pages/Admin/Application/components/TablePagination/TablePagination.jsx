import React from "react";
import "./TablePagination.css";

const TablePagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevClick = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="PaginationContainer">
            <button
                className="PaginationButton"
                onClick={handlePrevClick}
                disabled={currentPage === 1}
            >
                &laquo; Prev
            </button>
            <span className="PaginationText">
                Page {currentPage} of {totalPages}
            </span>
            <button
                className="PaginationButton"
                onClick={handleNextClick}
                disabled={currentPage === totalPages}
            >
                Next &raquo;
            </button>
        </div>
    );
};

export default TablePagination;
