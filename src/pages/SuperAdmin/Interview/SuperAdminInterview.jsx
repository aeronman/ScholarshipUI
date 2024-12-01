import React, { useState, useEffect } from "react";
import { getEvents, createEvent } from "../../../utils/googleCalendarUtils";
import "./SuperAdminInterview.css";

const SuperAdminInterview = ({ applicantEmail }) => {
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startTime, setStartTime] = useState(""); // For dynamic start time
    const [endTime, setEndTime] = useState(""); // For dynamic end time

    // Fetch existing interview or event when the component mounts
    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const events = await getEvents(); // Fetch events using gapi
                const existingEvent = events.find(event =>
                    event.attendees.some(attendee => attendee.email === applicantEmail)
                );
                setInterview(existingEvent);
            } catch (error) {
                console.error("Error fetching events:", error);
                setError("Failed to load interview data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchInterview();
    }, [applicantEmail]);

    // Schedule a new interview
    const scheduleInterview = async () => {
        if (!startTime || !endTime) {
            alert("Please select both start and end times.");
            return;
        }

        try {
            const newEvent = await createEvent({
                summary: "Scholarship Interview",
                description: "Interview with the applicant.",
                startTime,
                endTime,
                attendeeEmail: applicantEmail,
            });
            setInterview(newEvent);
        } catch (error) {
            console.error("Error creating event:", error);
            setError("Failed to schedule the interview. Please try again.");
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="interview-page">
            <h1>Admin Interview Page</h1>
            <div className="applicant-info">
                <p>Applicant Email: {applicantEmail}</p>
            </div>
            {interview ? (
                <div className="interview-details">
                    <h2>Scheduled Interview</h2>
                    <p>Date: {new Date(interview.start.dateTime).toLocaleString()}</p>
                    <p>
                        Meet Link:{" "}
                        <a href={interview.hangoutLink} target="_blank" rel="noopener noreferrer">
                            Join Call
                        </a>
                    </p>
                </div>
            ) : (
                <div className="schedule-form">
                    <h2>Schedule a New Interview</h2>
                    <label>
                        Start Time:
                        <input
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </label>
                    <label>
                        End Time:
                        <input
                            type="datetime-local"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </label>
                    <button onClick={scheduleInterview} className="schedule-button">
                        Schedule Interview
                    </button>
                </div>
            )}
        </div>
    );
};

export default SuperAdminInterview;
