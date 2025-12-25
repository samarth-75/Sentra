const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.addUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Generate unique password
    const randomPassword =
      Math.random().toString(36).slice(-8) + "A1@";

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(randomPassword, salt);

    const user = await User.create({
      name,
      email,
      role,
      passwordHash,
      plainPassword: randomPassword,   // Store it ✔
      institutionId: req.user.institutionId,
    });

    res.json({
      message: "User added successfully",
      user: {
        name,
        email,
        role,
        password: plainPassword
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user" });
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