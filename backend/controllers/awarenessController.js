const Awareness = require("../models/AwarenessItem");

exports.createAwareness = async (req, res) => {
  try {
    const { type, title, content } = req.body;

    const item = await Awareness.create({
      type,
      title,
      content,
      institutionId: req.user.institutionId,
    });

    res.json({ message: "Awareness created", item });
  } catch (err) {
  console.error("AWARENESS ERROR 👉", err);
  res.status(500).json({ message: err.message });
}
};

exports.getAwareness = async (req, res) => {
  try {
    const items = await Awareness.find({
      institutionId: req.user.institutionId,
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error loading awareness" });
  }
};

exports.deleteAwareness = async (req, res) => {
  try {
    await Awareness.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item" });
  }
};