const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");
const  authRoutes = require("./routes/authRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const awarenessRoutes = require("./routes/awarenessRoutes");    
const institutionRoutes = require("./routes/institutionRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://sentra-n0qg0jhbd-samarth-75s-projects.vercel.app",
  "https://sentra-n0qg0jhbd.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/awareness", awarenessRoutes); 
app.use("/api/institutions", institutionRoutes);

// test route
app.get("/api/health", (req, res) => {
  res.json({ message: "SENTRA backend is running" });
});

// connect to DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));