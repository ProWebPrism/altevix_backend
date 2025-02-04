const express = require("express");
const googleController = require("../controllers/googleController");

const router = express.Router();

router.get("/auth-url", googleController.getAuthUrl);
router.get("/callback", googleController.handleCallback);
router.post("/create-event", googleController.createEvent);
router.get('/getMeetings', googleController.getUpcomingEvents)
router.get('/getMeetingsadmin', googleController.getUpcomingEventsAdmin)
module.exports = router;