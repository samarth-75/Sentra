const Incident = require("../models/Incident");
const { v4: uuidv4 } = require("uuid");

// CREATE INCIDENT (Student/Staff)
exports.createIncident = async (req, res) => {
  try {
    const { title, description, category, date, location, isAnonymous } = req.body;

    // Create unique reference ID
    const referenceId = "INC-" + uuidv4().slice(0, 8).toUpperCase();

    const newIncident = await Incident.create({
      referenceId,
      title,
      description,
      category,
      date,
      location,
      isAnonymous,
      reporter: req.user.id, // from auth middleware
      institutionId: req.user.institutionId,
    });

    res.json({
      message: "Incident reported successfully",
      incident: newIncident,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET INCIDENTS OF LOGGED-IN STUDENT/STAFF
exports.getMyIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({
      reporter: req.user.id,
      institutionId: req.user.institutionId,
    });

    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN — GET ALL INCIDENTS IN THEIR INSTITUTION
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({
      institutionId: req.user.institutionId,
    });

    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN — UPDATE INCIDENT STATUS
exports.updateIncidentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Incident.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Incident status updated successfully",
      incident: updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN — ASSIGN STAFF
exports.assignStaff = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const updated = await Incident.findByIdAndUpdate(
      req.params.id,
      { assignedTo },
      { new: true }
    );

    res.json({
      message: "Staff assigned successfully",
      incident: updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};