import React from "react";
import "./ActionButtons.css";

const ActionButtons = () => {
  return (
    <div className="action-buttons">
      <button className="update-button">
        Update <i className="fa fa-refresh"></i>
      </button>
      <button className="export-button">
        Export <i className="fa fa-download"></i>
      </button>
    </div>
  );
};

export default ActionButtons;
