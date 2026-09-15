const express = require("express");
const mongoose = require("mongoose");

const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "BRL Event Management API is running"
    });
});

// Event routes
app.use("/events", eventRoutes);

// MongoDB connection
mongoose
    .connect("mongodb://127.0.0.1:27017/brl_task_1")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});