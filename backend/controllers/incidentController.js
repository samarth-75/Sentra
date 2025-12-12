const Incident = require("../models/Incident");
const { v4: uuidv4 } = require("uuid");

// Create incident (student or staff)
exports.createIncident = async (req, res) => {
  try {
    const { title, description, category, location, date, anonymous } = req.body;

    const refId = "INC-" + uuidv4().split("-")[0].toUpperCase();

    const incident = await Incident.create({
      title,
      description,
      category,
      location,
      date,
      referenceId: refId,
      anonymous,
      reporterId: req.user._id,
      institutionId: req.user.institutionId,
    });

    res.json({ message: "Incident reported successfully", incident });
  } catch (err) {
    res.status(500).json({ message: "Error creating incident" });
  }
};

// Admin – Get all incidents in institution
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({
      institutionId: req.user.institutionId,
    }).populate("reporterId", "name email role");

    res.json(incidents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching incidents" });
  }
};

// Admin – Update status + assign + notes
exports.updateStatus = async (req, res) => {
  try {
    const { status, assignedTo, notes } = req.body;

    const updated = await Incident.findByIdAndUpdate(
      req.params.id,
      { status, assignedTo, notes },
      { new: true }
    );

    res.json({ message: "Incident updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating incident" });
  }
};