const express = require("express");
const router = express.Router();

// AUTH
const { register, login } = require("../controllers/authController");

// SUPERADMIN
const {
  createInstitution,
  getAllInstitutions,
} = require("../controllers/institutionController");

// INCIDENTS
const {
  createIncident,
  getAllIncidents,
  updateStatus,
} = require("../controllers/incidentController");

// USERS (students & staff)
const {
  addUser,
  getUsers,
  deleteUser,
} = require("../controllers/userController");

// AWARENESS
const {
  createAwareness,
  getAwareness,
  deleteAwareness,
} = require("../controllers/awarenessController");

// Middleware
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  updateIncidentStatus,
  getMyIncidents,
} = require("../controllers/incidentController");


// ---------------------------------------
// AUTH ROUTES
// ---------------------------------------
router.post("/register", register);
router.post("/login", login);


// ---------------------------------------
// SUPERADMIN ROUTES
// ---------------------------------------
router.get("/institutions", auth, role("superadmin"), getAllInstitutions);

router.post(
  "/create-institution",
  auth,
  role("superadmin"),
  createInstitution
);


// ---------------------------------------
// INCIDENT ROUTES
// ---------------------------------------

// Student/Staff create incident
router.post(
  "/incident/create",
  auth,
  role("student", "staff"),
  createIncident
);

// Admin view all incidents in institution
router.get(
  "/incident/all",
  auth,
  role("admin"),
  getAllIncidents
);

// Admin update incident status, notes, assignedTo
router.put(
  "/incident/update/:id",
  auth,
  role("admin"),
  updateStatus
);

// Student/Staff - My reports
router.get(
  "/incident/my",
  auth,
  role("student", "staff"),
  getMyIncidents
);


// ---------------------------------------
// USER MANAGEMENT (Admin)
// ---------------------------------------

// Add Student or Staff
router.post("/add-user", auth, role("admin"), addUser);

// Get users of a specific role (student/staff)
router.get("/users/:role", auth, role("admin"), getUsers);

// Delete user
router.delete("/user/:id", auth, role("admin"), deleteUser);


// ---------------------------------------
// AWARENESS ROUTES (Admin)
// ---------------------------------------

// Create awareness content
router.post(
  "/awareness/create",
  auth,
  role("admin"),
  createAwareness
);

// Get all awareness items for admin’s institution
router.get(
  "/awareness",
  auth,
  role("admin"),
  getAwareness
);

// Delete awareness item
router.delete(
  "/awareness/:id",
  auth,
  role("admin"),
  deleteAwareness
);


module.exports = router;