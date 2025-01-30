const express = require("express");
const googleController = require("../controllers/googleController");

const router = express.Router();

router.get("/auth-url", googleController.getAuthUrl);
router.get("/callback", googleController.handleCallback);
router.post("/create-event", googleController.createEvent);
router.get('/getMeetings', googleController.getUpcomingEvents)
module.exports = router;