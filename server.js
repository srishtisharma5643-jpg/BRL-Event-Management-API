require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "BRL Event Management API is running"
    });
});
// Event routes
app.use("/events", eventRoutes);
//auth routes
app.use("/auth", authRoutes);

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});