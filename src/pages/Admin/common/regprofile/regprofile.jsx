import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles for the date picker
import { FaCalendarAlt } from "react-icons/fa"; // Calendar Icon from react-icons
import "./regprofile.css";

export default function RegProfile() {
    const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
    const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Manage calendar popup visibility
    const [isNotifOpen, setIsNotifOpen] = useState(false); // Manage notification popup visibility

    const fullName = localStorage.getItem("fullname") || "User Name";
    const userType = localStorage.getItem("usertype") || "User Type";
    const avatar = localStorage.getItem("avatar");

    // Sample notifications (replace this with your dynamic data source)
    const notifications = [
        { id: 1, message: "Thank you for submitting your application form.", date: "25 April" },
        { id: 2, message: "Reminder: Submit your application before 26 April 2024.", date: "20 April" },
        { id: 3, message: "Announcement: Stay updated on the latest news.", date: "10 March" },
    ];

    // Handle date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setIsCalendarOpen(false); // Close calendar after selecting a date
    };

    return (
        <div className="ProfileDiv">
            <img
                src={avatar || "https://res.cloudinary.com/ddiyjqv0u/image/upload/v1725511392/Profile_img_xz1n2v.png"}
                alt="Profile"
            />
            <div className="nameStatusDiv">
                <p className="profileName">Hi, {fullName}</p>
                <p className="profileStatus">{userType}</p>
            </div>
            <div className="profileVR"></div>
            <div className="profileCalendarDiv">
                {/* Calendar Icon: Clicking on this will open the DatePicker */}
                <FaCalendarAlt
                    size={30}
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)} // Toggle calendar visibility
                    style={{ cursor: "pointer", marginRight: "10px" }}
                />
                {/* Only show the DatePicker if the calendar is open */}
                {isCalendarOpen && (
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="d MMMM yyyy" // This will show format like "14 September"
                        className="datePicker"
                        popperModifiers={{
                            offset: {
                                enabled: true,
                                offset: "0px, 10px",
                            },
                        }}
                        inline={false} // Ensures it's a floating calendar
                    />
                )}
                <p>{selectedDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p> {/* Display the selected date in "14 September" format */}
            </div>
            <div className="profileIconsDiv">
                <img
                    src="https://res.cloudinary.com/ddiyjqv0u/image/upload/v1725512956/profile_notif_icon_f51d4l.png"
                    alt="Notifications Icon"
                    onClick={() => setIsNotifOpen(!isNotifOpen)} // Toggle notification visibility
                />
                {isNotifOpen && (
                    <div className="notificationsDropdown">
                        <h4>Notifications</h4>
                        <ul>
                            {notifications.map((notif) => (
                                <li key={notif.id}>
                                    <p>{notif.message}</p>
                                    <span>{notif.date}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
