// config/googleConfig.js
const { google } = require("googleapis");
const dotenv = require('dotenv')
dotenv.config()

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID, // New client_id
    process.env.GOOGLE_CLIENT_SECRET, // New client_secret
    "http://localhost:5000/api/google/callback" // Ensure this matches your redirect URI
);

module.exports = oauth2Client;
