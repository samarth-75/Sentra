const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.addUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const password = Math.random().toString(36).slice(-10) + "A1@";
    const passwordHash = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      role,
      passwordHash,
      plainPassword: password,
      institutionId: req.user.institutionId,
    });

    res.json({
      message: `${role} created successfully`,
      credentials: {
        email: user.email,
        password,
      },
    });

  } catch (err) {
    console.log("ADD USER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const role = req.params.role;
    const adminInstitution = req.user.institutionId;

    const users = await User.find({
      role,
      institutionId: adminInstitution,
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};