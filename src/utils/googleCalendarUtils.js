import { gapi } from "gapi-script";

// Initialize the GAPI Client
export const initializeGapiClient = () => {
    return new Promise((resolve, reject) => {
        gapi.load("client:auth2", async () => {
            try {
                await gapi.client.init({
                    apiKey: "AIzaSyC-P74JNJOn4dO-XuGo3u5-jVtFCV79BVI", // API Key
                    clientId: "838534377733-746qa86si60iggc1rclouo8jeoaqg3j0.apps.googleusercontent.com", //  Client ID
                    discoveryDocs: [
                        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
                    ],
                    scope: "https://www.googleapis.com/auth/calendar.events",
                });
                console.log("GAPI client initialized!");
                resolve(gapi);
            } catch (error) {
                console.error("Error initializing GAPI client:", error);
                reject(error);
            }
        });
    });
};

// Fetch events from Google Calendar
export const getEvents = async () => {
    try {
        if (!gapi.client || !gapi.client.calendar) {
            throw new Error("GAPI client is not initialized or calendar API is unavailable.");
        }

        const response = await gapi.client.calendar.events.list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: "startTime",
        });

        return response.result.items;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

// Create a new event in Google Calendar
export const createEvent = async (eventDetails) => {
    try {
        if (!gapi.client || !gapi.client.calendar) {
            throw new Error("GAPI client is not initialized or calendar API is unavailable.");
        }

        const event = {
            summary: eventDetails.summary,
            description: eventDetails.description,
            start: { dateTime: eventDetails.startTime },
            end: { dateTime: eventDetails.endTime },
            attendees: [{ email: eventDetails.attendeeEmail }],
            conferenceData: {
                createRequest: {
                    requestId: Date.now().toString(),
                    conferenceSolutionKey: { type: "hangoutsMeet" },
                },
            },
        };

        const response = await gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
            conferenceDataVersion: 1,
        });

        return response.result;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};
