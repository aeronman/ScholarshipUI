import React from "react";
import { FaFilter } from "react-icons/fa";
import "./FilterButton.css";

const FilterButton = () => {
    return (
        <button className="FilterButton">
            <FaFilter className="FilterIcon" />
            Filter
        </button>
    );
};

export default FilterButton;
