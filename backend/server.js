const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");
const  authRoutes = require("./routes/authRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const awarenessRoutes = require("./routes/awarenessRoutes");    
const institutionRoutes = require("./routes/institutionRoutes");

const app = express();

app.use(cors({
  origin: [
    "https://localhost:5173",
    "https://sentra-eight.vercel.app"
   ], // change if your frontend uses another host/port
  credentials: true,
}));
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