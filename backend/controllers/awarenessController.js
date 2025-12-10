const AwarenessItem = require("../models/AwarenessItem");

// ADMIN — CREATE AWARENESS ITEM
exports.createAwareness = async (req, res) => {
  try {
    const { type, title, content } = req.body;

    const item = await AwarenessItem.create({
      type,
      title,
      content,
      institutionId: req.user.institutionId
    });

    res.json({
      message: "Awareness item created successfully",
      item
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN — UPDATE AWARENESS ITEM
exports.updateAwareness = async (req, res) => {
  try {
    const { type, title, content } = req.body;

    const item = await AwarenessItem.findByIdAndUpdate(
      req.params.id,
      { type, title, content },
      { new: true }
    );

    res.json({
      message: "Awareness item updated successfully",
      item
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN — DELETE AWARENESS ITEM
exports.deleteAwareness = async (req, res) => {
  try {
    await AwarenessItem.findByIdAndDelete(req.params.id);

    res.json({ message: "Awareness item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// STUDENT/STAFF/ADMIN — VIEW ALL AWARENESS ITEMS
exports.getAwarenessItems = async (req, res) => {
  try {
    const items = await AwarenessItem.find({
      institutionId: req.user.institutionId
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};