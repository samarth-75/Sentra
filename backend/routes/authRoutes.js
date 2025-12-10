const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { createInstitution } = require("../controllers/institutionController");
const { createIncident, getAllIncidents, updateIncidentStatus } = require("../controllers/incidentController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");


// Routes
router.post("/register", register);
router.post("/login", login);
router.post(
  "/create-institution",
  auth,
  role("superadmin"),
  createInstitution
);
router.post(
  "/create",
  auth,
  role("student", "staff"), 
  createIncident
);
router.get("/all-incidents", auth, role("admin"), getAllIncidents);
router.put(
  "/update-status/:id",
  auth,
  role("admin"),
  updateIncidentStatus
);



module.exports = router;