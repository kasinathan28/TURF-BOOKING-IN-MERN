const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

// User Signup
exports.signup = async (req, res) => {
  console.log("signup called");
  try {
    const { username, phoneNumber, password } = req.body;

    if (!username || !phoneNumber || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const newUser = new Users({
      username: username,
      phoneNumber: phoneNumber,
      password: password,
      avatar: req.file.filename,
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
    console.log("Sign up success");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Sign up failed");
  }
};


// User Login
// User Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await Users.findOne({ username: username });

    if (!user) {
      console.log("User not found:", username);
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      console.log("Incorrect password for user:", username);
      return res.status(401).json({ error: "Incorrect password" });
    }

    res
      .status(200)
      .json({ message: "Login successful", user: user }); // Sending user data including ID
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// Corrected server-side route
exports.getUserDetailsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId:", userId);

    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = {
      userId: user._id,
      username: user.username,
      phoneNumber: user.phoneNumber,
      avatar: user.avatar,
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// Update profile with User Id
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { phoneNumber, username, password } = req.body;

    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = password;
    }

    await user.save();

    res.status(200).json({
      phoneNumber: user.phoneNumber,
      username: user.username,
    });

  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

