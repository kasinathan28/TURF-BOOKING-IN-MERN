const Admin = require("../models/Admin");
const Users = require("../models/Users");
const Turfs = require("../models/Turf");


// Admin Login
exports.login = async (req, res) => {
  console.log("Admin login called.");

  try {
    const { secretKey } = req.body;

    if (!secretKey) {
      return res.status(400).json({ error: "Secret key is required" });
    }

    // Assuming Admin is a Mongoose model for interacting with MongoDB
    const admin = await Admin.findOne({ secretKey: secretKey });

    if (!admin) {
      console.log("Admin not found");
      return res.status(404).json({ error: "Admin not found" });
    }

    // If the secret key is valid, you can perform additional admin-related actions here

    res.status(200).json({ message: "Admin login successful" });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// Router for getting all the user to the admin 
exports.getallUsers = async (req, res) => {
  console.log("Admin api for fetching all users");
  try {
    const users = await Users.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log("Error fetching the users", error);
    res.status(500).json({ error: "Internal server Error" });
  }
};



