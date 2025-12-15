const Incident = require("../models/Incident");

exports.getAdminDashboardStats = async (req, res) => {
  try {
    
    const institutionId = req.user.institutionId;

    const total = await Incident.countDocuments({ institutionId });
    const pending = await Incident.countDocuments({
      institutionId,
      status: "Pending",
    });
    const inProgress = await Incident.countDocuments({
      institutionId,
      status: "In Progress",
    });
    const resolved = await Incident.countDocuments({
      institutionId,
      status: "Resolved",
    });

    const recentIncidents = await Incident.find({ institutionId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      total,
      pending,
      inProgress,
      resolved,
      recentIncidents,
    });
  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};