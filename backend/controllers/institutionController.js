const Institution = require("../models/Institution");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// SUPER ADMIN — CREATE INSTITUTION
exports.createInstitution = async (req, res) => {
  try {
    const { name, address, contactEmail, adminName, adminEmail, adminPassword } = req.body;

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    // Create admin user for this institution
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(adminPassword, salt);

    const adminUser = await User.create({
      name: adminName,
      email: adminEmail,
      passwordHash,
      role: "admin",
      institutionId: null, // will set below
    });

    // Now create institution
    const institution = await Institution.create({
      name,
      address,
      contactEmail,
      adminId: adminUser._id.toString(),
    });

    // Link admin to institution
    adminUser.institutionId = institution._id.toString();
    await adminUser.save();

    res.json({
      message: "Institution created successfully",
      institution,
      adminUser,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
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