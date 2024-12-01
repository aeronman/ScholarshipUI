import React from "react";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi"; // Importing search icon

const SearchBar = () => {
    return (
        <div className="SearchBarContainer">
            <input
                type="text"
                placeholder="Search applicants..."
                className="SearchInput"
            />
            <button className="SearchButton">
                <FiSearch /> {/* Icon added here */}
            </button>
        </div>
    );
};

export default SearchBar;
