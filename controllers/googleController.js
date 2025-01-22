const { google } = require("googleapis");
const oauth2Client = require("../config/googleConfig");

// Generate Google OAuth URL
exports.getAuthUrl = (req, res) => {
    const { page } = req.query; // e.g., 'page1', 'page2', 'page3'

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/calendar.events"],
        redirect_uri: "http://localhost:5000/api/google/callback",
        prompt: "consent", // Ensures a refresh token is returned
        state: page, // Add the originPage as a state parameter
    });

    res.json({ authUrl });
};


// Handle Google OAuth Callback
exports.handleCallback = async (req, res) => {
    const code = req.query.code;
    
    const originPage = req.query.state; // Retrieve the originating page

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        

        // Save tokens in the session or database
        req.session.tokens = tokens;

        // Redirect based on the originating page
        let redirectUrl;

                redirectUrl = `http://localhost:5173?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`;
        

        res.redirect(redirectUrl);
    } catch (err) {
        console.error("Error during OAuth callback:", err);
        res.status(500).json({ error: "Authentication failed" });
    }
};


// Create a Google Calendar Event
exports.createEvent = async (req, res) => {
    const { summary, startTime, endTime } = req.body;

    try {
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        // Define the event details
        const event = {
            summary,
            start: { dateTime: startTime },
            end: { dateTime: endTime },
            conferenceData: {
                createRequest: { requestId: "unique-request-id" },
            },
        };

        // Schedule the event for the user's calendar
        const userEventResponse =  calendar.events.insert({
            calendarId: "primary",
            resource: event,
            conferenceDataVersion: 1,
        });

        // Business owner's OAuth2 client
        const businessOwnerOauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );

        // Set the credentials for the business owner
        businessOwnerOauth2Client.setCredentials({
            access_token: process.env.BUSINESS_OWNER_ACCESS_TOKEN,
            refresh_token: process.env.BUSINESS_OWNER_REFRESH_TOKEN,
        });

        const businessOwnerCalendar = google.calendar({
            version: "v3",
            auth: businessOwnerOauth2Client,
        });

        // Schedule the event for the business owner's calendar
        const businessOwnerEventResponse =  businessOwnerCalendar.events.insert({
            calendarId: "primary",
            resource: event,
            conferenceDataVersion: 1,
        });

        res.json({
            message: "Event created successfully",
            userEvent: userEventResponse.data,
            businessOwnerEvent: businessOwnerEventResponse.data,
        });
    } catch (err) {
        console.error("Error creating event:", err);
        res.status(500).json({ error: "Failed to create event" });
    }
};

