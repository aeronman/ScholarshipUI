import React, { useState, useEffect } from "react";
import AdminSidebar from "../common/AdminSidebar/AdminSidebar";
import RegProfile from "../../Registered/common/regprofile/regprofile";
import "./AdminFeedbacks.css";

export default function AdminFeedbacks() {
  const [noReviewsMessage, setNoReviewsMessage] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage] = useState(8); // Number of reviews per page
  const [reviews, setFeedbackData] = useState([]);
  useEffect(() => {
    const fetchApplicantsStatus = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get/fetch_feedbacks.php`);
        const data = await response.json();
        
        if (data.error) {
          console.error("Error fetching data:", data.error);
        } else {
          setFeedbackData(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchApplicantsStatus();
  }, []);
  
  useEffect(() => {
    if (filterStatus === "All") {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) => review.status === filterStatus);
      setFilteredReviews(filtered);
    }

    if (reviews.length === 0) {
      setNoReviewsMessage("No reviews available.");
    } else {
      setNoReviewsMessage("");
    }
  }, [filterStatus, reviews]);

  // Handle pagination logic
  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setIsDropdownOpen(false);
  };

  const handleRespondClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
    // Only clear the response text if it's a 'Respond' action
    if (review.status !== "Responded") {
      setResponseText("");
    }
  };

  const handleClosePopUp = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleSaveResponse = () => {
    const updatedReviews = reviews.map((review) =>
      review === selectedReview ? { ...review, status: "Responded", response: responseText } : review
    );
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const renderStars = (rating) => {
    const fillPercentage = `${(rating / 5) * 100}%`; // Calculate percentage fill for the rating

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div className="star-container">
          <div className="star-outline">
            <div
              className="star-fill"
              style={{
                width: fillPercentage, // Adjust width dynamically
              }}
            ></div>
          </div>
        </div>
        <span>{rating.toFixed(2)}</span>
      </div>
    );
  };

  return (
    <div className="AdminFeedbackDiv1">
      <div className="AdminFeedbackDiv1-1">
        <AdminSidebar />
      </div>

      <div className="AdminFeedbackDiv1-2">
        <div className="AdminFeedbackDiv1-2-1">
          <RegProfile />
        </div>

        <div className="AdminFeedbackDiv1-2-2">
          <div className="feedback-header">
            <h1>Feedback</h1>
          </div>

          <div className="reviews-section">
            <h2>
              Reviews <span className="review-count">({filteredReviews.length})</span>
            </h2>

            <div className="filter-dropdown">
              <button
                className={`filter-select ${isDropdownOpen ? "open" : ""}`}
                onClick={toggleDropdown}
              >
                {filterStatus}
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
                <li onClick={() => handleFilterChange("All")}>All</li>
                <li onClick={() => handleFilterChange("Responded")}>Responded</li>
                <li onClick={() => handleFilterChange("Not Responded")}>Not Responded</li>
              </ul>
            </div>
          </div>

          {noReviewsMessage && <div className="no-reviews-message">{noReviewsMessage}</div>}

          {currentReviews.length > 0 && (
            <table className="AdminFeedbackDiv1-2-2-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Rating</th>
                  <th>Question</th>
                  <th>Comments</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentReviews.map((review, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{review.created_at}</td>
                    <td>{review.name}</td>
                    <td>
                      <div className="stars-container">{renderStars(review.rating_page)}</div>
                    </td>
                    <td>How's our website experience?</td>
                    <td>{review.comments}</td>
                    <td className={review.status === "Responded" ? "responded" : "not-responded"}>
                      {review.status}
                    </td>
                    <td>
                      <button
                        className={`action-btn ${review.status === "Responded" ? "view" : "respond"}`}
                        onClick={() => handleRespondClick(review)}
                      >
                        {review.status === "Responded" ? "View" : "Respond"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination Controls (Only Page Numbers) */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={index + 1 === currentPage ? "active-page" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Modal for responding */}
          {isModalOpen && selectedReview && (
            <div className="popup-overlay">
              <div className="popup">
                <button className="close-btn" onClick={handleClosePopUp}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="close-icon">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <h2>{selectedReview.status === "Responded" ? "View Response" : "Respond to Review"}</h2>
                <div>
                  <strong>Reviewer:</strong> {selectedReview.name}
                </div>
                <div>
                  <strong>Comments:</strong> {selectedReview.comments}
                </div>
                {selectedReview.status === "Responded" ? (
                  <div>
                    <strong>Response:</strong> {selectedReview.response}
                  </div>
                ) : (
                  <div>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Write your response here..."
                    ></textarea>
                  </div>
                )}
                {selectedReview.status !== "Responded" && (
                  <button onClick={handleSaveResponse}>Save Response</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
