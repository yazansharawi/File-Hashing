const models = require("../../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");
const User = models.User;
const bcrypt = require('bcrypt');
const  {internalAxios}  = require("../../services/axios");


async function createUser(req, res) {
  try {
    const { userName, email, password } = req.body;
    const user = await User.create({
      userName: userName,
      email: email,
      password: password,
    });

    let userUuid = await internalAxios.get("user/user-by-id/" + user.id);


    const token = jwt.sign({ userId: user.userId }, secretKey, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User created successfully",
      userUuid: userUuid.data.uuid,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error: error.toString() });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }


    const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: "1h" });
    res.status(200).json({
      message: "User logged in successfully",
      userUuid: user.userUuid,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in user", error: error.toString() });
  }
}

async function changePass(req, res) {
  try {
    const { email, password, token } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error changing password", error: error.toString() });
  }
}

async function checkEmail(req, res) {
  try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error verifying email", error: error.toString() });
  }
}

module.exports = {
  createUser,
  loginUser,
  changePass,
  checkEmail
};
