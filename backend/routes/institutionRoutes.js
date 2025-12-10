const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createInstitution,
  getAllInstitutions
} = require("../controllers/institutionController");

// ONLY SUPER ADMIN CAN CREATE INSTITUTIONS
router.post("/create", auth, role("superadmin"), createInstitution);

// ONLY SUPER ADMIN CAN SEE ALL INSTITUTIONS
router.get("/all", auth, role("superadmin"), getAllInstitutions);

module.exports = router;