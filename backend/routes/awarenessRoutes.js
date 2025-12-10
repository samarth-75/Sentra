const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createAwareness,
  updateAwareness,
  deleteAwareness,
  getAwarenessItems
} = require("../controllers/awarenessController");

// ANY LOGGED-IN USER (student, staff, admin) CAN VIEW AWARENESS ITEMS
router.get("/", auth, getAwarenessItems);

// ADMIN ONLY — CREATE
router.post("/create", auth, role("admin"), createAwareness);

// ADMIN ONLY — UPDATE
router.put("/:id", auth, role("admin"), updateAwareness);

// ADMIN ONLY — DELETE
router.delete("/:id", auth, role("admin"), deleteAwareness);

module.exports = router;