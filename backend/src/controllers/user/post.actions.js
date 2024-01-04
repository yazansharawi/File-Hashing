const jwt = require("jsonwebtoken");
const models = require("../../models");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");
const User = models.User;


async function createUser(req, res) {
  try {
    const { userName, email, password } = req.body;
    const user = await User.create({
      userName: userName,
      email: email,
      password: password,
    });

    const token = jwt.sign({ userId: user.userId }, secretKey, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User created successfully",
      userUid: user.userUid,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error: error.toString() });
  }
}

module.exports = {
  createUser,
};
