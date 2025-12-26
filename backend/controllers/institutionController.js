const Institution = require("../models/Institution");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createInstitution = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const institution = await Institution.create({
      name,
      email,
      address,
    });

    const password = "Admin@123";
    const passwordHash = bcrypt.hashSync(password, 10);

    const admin = await User.create({
      name: `${name} Admin`,
      email,
      passwordHash,
      plainPassword: password,
      role: "admin",
      institutionId: institution._id,
    });

    res.json({
      message: "Institution & Admin created successfully",
      institution,
      adminCredentials: {
        email: admin.email,
        password,
      },
    });
  } catch (err) {
    console.log("🔥 CREATE INSTITUTION ERROR:", err);
    res.status(500).json({ message: err.message });
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

exports.getAllInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find();
    res.json(institutions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};