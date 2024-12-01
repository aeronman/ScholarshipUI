import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegFeedbacks.css';

import RegSideBar from "../common/regsidebar/RegSidebar";
import RegProfile from "../common/regprofile/regprofile";

const FeedbackPage = () => {
    const [ratingPage, setRatingPage] = useState(0);
    const [ratingService, setRatingService] = useState(0);
    const [scholarshipFeedback, setScholarshipFeedback] = useState('');
    const [comments, setComments] = useState('');
    const [hasProvidedFeedback, setHasProvidedFeedback] = useState(false);

    // Check if feedback is already given
    useEffect(() => {
        const feedbackGiven = localStorage.getItem('feedback_given');
        if (feedbackGiven === '1') {
            setHasProvidedFeedback(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userID = localStorage.getItem('id');
        if (!userID) {
            alert("User ID not found in localStorage.");
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/post/submit_feedback.php`,
                {
                    userID,
                    ratingPage,
                    ratingService,
                    scholarshipFeedback,
                    comments,
                }
            );

            alert(response.data.message);

            // Set feedback_given in localStorage and reload page
            localStorage.setItem('feedback_given', '1');
            setHasProvidedFeedback(true);
            window.location.reload(); // Reload the page to reflect the changes
        } catch (error) {
            console.error("There was an error submitting the feedback!", error);
            alert("An error occurred while submitting your feedback.");
        }
    };

    const renderStars = (rating, setRating) => (
        Array(5).fill(0).map((_, index) => (
            <span
                key={index}
                onClick={() => setRating(index + 1)}
                className={index < rating ? 'star selected' : 'star'}
            >★</span>
        ))
    );

    return (
        <div className="FeedbacksDiv1">
            <div className="FeedbacksDiv1-1">
                <RegSideBar />
            </div>

            <div className="RegApplicationDiv1-2">
                <div className="RegApplicationDiv1-2-1">
                    <RegProfile />
                </div>

                <h3 className="feedback-header">Give us Feedback</h3>

                {hasProvidedFeedback ? (
                    <div className="feedback-message">
                        <h2>Thank you for your feedback!</h2>
                        <p>You have already provided feedback. We appreciate your input.</p>
                    </div>
                ) : (
                    <div className="feedback-container">
                        <h2>We would like your feedback to improve our website.</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="feedback-question">
                                <label>How would you rate your experience of our page?</label>
                                <div className="star-rating">
                                    {renderStars(ratingPage, setRatingPage)}
                                </div>
                            </div>
                            <div className="feedback-question">
                                <label>How would you rate the support provided in terms of service quality?</label>
                                <div className="star-rating">
                                    {renderStars(ratingService, setRatingService)}
                                </div>
                            </div>
                            <div className="feedback-question">
                                <label>Does the scholarship help with your academics? Please explain why.</label>
                                <textarea
                                    value={scholarshipFeedback}
                                    onChange={(e) => setScholarshipFeedback(e.target.value)}
                                    placeholder="Please provide any additional comments or suggestions."
                                />
                            </div>
                            <div className="feedback-question">
                                <label>Please let us know if you have any comments or suggestions.</label>
                                <textarea
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    placeholder="Type here."
                                />
                            </div>
                            <button type="submit" className="submit-button">Send Feedback</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackPage;
