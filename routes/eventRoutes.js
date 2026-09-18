const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/eventControllers");

router.get("/", authMiddleware, getEvents);

router.get("/:id", getEvent);

router.post("/", authMiddleware, createEvent);

router.put("/:id", authMiddleware, updateEvent);

router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;