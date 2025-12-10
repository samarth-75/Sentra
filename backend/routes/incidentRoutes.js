const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createIncident,
  getMyIncidents,
  getAllIncidents,
  updateIncidentStatus,
  assignStaff
} = require("../controllers/incidentController");

// STUDENT + STAFF — Create Incident
router.post("/create", auth, role("student", "staff"), createIncident);

// STUDENT + STAFF — View Their Own Incidents
router.get("/my", auth, role("student", "staff"), getMyIncidents);

// ADMIN — View All Incidents
router.get("/all", auth, role("admin"), getAllIncidents);

// ADMIN — Update Status
router.put("/update-status/:id", auth, role("admin"), updateIncidentStatus);

// ADMIN — Assign Staff
router.put("/assign/:id", auth, role("admin"), assignStaff);

module.exports = router;