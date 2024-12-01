import { Outlet, useLocation } from "react-router-dom";
import { Chatbot } from "./Chatbot";

const PageWithChatbot = () => {
    const location = useLocation();

    // Define the pages where the chatbot should be shown
    const allowedChatbotPaths = [
        "/",        // Guest Home
        "/about",   // Guest About
        "/login",   // Guest Login
        "/signup",  // Guest Signup
        "/regdashboard", // Registered User Dashboard
        "/regFAQs",
        "/regFeedbacks",
        "/regApplication",
        "/regStatus",
        "/regProfile",
    ];

    // Check if current path allows chatbot
    const showChatbot = allowedChatbotPaths.includes(location.pathname);

    return (
        <div>
            {showChatbot && <Chatbot />}
            <Outlet />
        </div>
    );
};

export default PageWithChatbot;
