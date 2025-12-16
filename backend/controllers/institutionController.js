const Institution = require("../models/Institution");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createInstitution = async (req, res) => {
  try {
    const { name, address, email } = req.body;

    // 1) Create Institution
    const institution = await Institution.create({
      name,
      address,
      email,
    });

    // 2) Auto-create Admin for Institution
    const adminPassword = "Admin@123"; // You can generate random later

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(adminPassword, salt);

    const adminUser = await User.create({
      name: `${name} Admin`,
      email: `${name.toLowerCase().replace(/\s+/g, "")}@sentra.admin`, 
      passwordHash,
      role: "admin",
      institutionId: institution._id,
    });

    // update institution with adminId
    institution.adminId = adminUser._id;
    await institution.save();

    res.json({
      message: "Institution & Admin created successfully",
      institution,
      adminLogin: {
        email: adminUser.email,
        password: adminPassword,
      },
    });
  } catch (err) {
    console.error("Create Institution Error:", err);
    res.status(500).json({ message: "Error creating institution" });
  }
};

// SUPER ADMIN — LIST ALL INSTITUTIONS
exports.getAllInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find();
    res.json(institutions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteInstitution = async (req, res) => {
  try {
    const institutionId = req.params.id;

    // delete institution
    await Institution.findByIdAndDelete(institutionId);

    // optional but recommended: delete related users
    await User.deleteMany({ institutionId });

    res.json({ message: "Institution deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInstitutionById = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }
    res.json(institution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};