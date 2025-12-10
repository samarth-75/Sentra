const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ role: "superadmin" });

    if (existing) {
      console.log("Superadmin already exists:", existing.email);
      process.exit();
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync("SuperAdmin@123", salt);

    const superadmin = await User.create({
      name: "Super Admin",
      email: "superadmin@sentra.com",
      passwordHash,
      role: "superadmin",
      institutionId: null,
    });

    console.log("SuperAdmin Created Successfully:", superadmin);
    process.exit();
  } catch (err) {
    console.error("Error seeding superadmin:", err);
    process.exit(1);
  }
};

seedSuperAdmin();