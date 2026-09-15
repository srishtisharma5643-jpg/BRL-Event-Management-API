const Event = require("../models/event");

const getEvents = async (req, res) => {
    try {
        const {
            search,
            status,
            page = 1,
            limit = 10,
            sort = "date"
        } = req.query;

        let query = {};

        // Search by title
        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Pagination
        const skip = (page - 1) * limit;

        const events = await Event.find(query)
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        const totalEvents = await Event.countDocuments(query);

        res.status(200).json({
            totalEvents,
            currentPage: Number(page),
            totalPages: Math.ceil(totalEvents / limit),
            events
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching events"
        });
    }
};


const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.json(event);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching event"
        });
    }
};


const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, capacity } = req.body;

        if (
            title === undefined ||
            description === undefined ||
            date === undefined ||
            location === undefined ||
            capacity === undefined
        ) {
            return res.status(400).json({
                message: "All required fields must be provided"
            });
        }

        if (title.trim() === "") {
            return res.status(400).json({
                message: "Event title cannot be empty"
            });
        }

        if (description.trim() === "") {
            return res.status(400).json({
                message: "Event description cannot be empty"
            });
        }

        if (location.trim() === "") {
            return res.status(400).json({
                message: "Event location cannot be empty"
            });
        }

        if (typeof capacity !== "number" || capacity <= 0) {
            return res.status(400).json({
                message: "Capacity must be a positive number"
            });
        }

        const eventDate = new Date(date);

        if (isNaN(eventDate.getTime())) {
            return res.status(400).json({
                message: "Invalid event date"
            });
        }

        if (eventDate < new Date()) {
            return res.status(400).json({
                message: "Event date cannot be in the past"
            });
        }

        // 8. Check duplicate event
const duplicateEvent = await Event.findOne({
    title: title.trim(),
    date: eventDate,
    location: location.trim()
});

if (duplicateEvent) {
    return res.status(409).json({
        message: "Duplicate event already exists"
    });
}

// 9. Create event
const event = await Event.create({
    ...req.body,
    title: title.trim(),
    description: description.trim(),
    location: location.trim(),
    date: eventDate
});

res.status(201).json(event);

    } catch (error) {
        res.status(500).json({
            message: "Error creating event"
        });
    }
};


const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Started or completed events cannot be edited
        if (
            event.status === "Completed" ||
            new Date(event.date) <= new Date()
        ) {
            return res.status(409).json({
                message: "Started or completed events cannot be edited"
            });
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json(updatedEvent);

    } catch (error) {
        res.status(500).json({
            message: "Error updating event"
        });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        if (event.status === "Completed") {
            return res.status(409).json({
                message: "Completed events cannot be deleted"
            });
        }

        await Event.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Event deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting event"
        });
    }
};


module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
};