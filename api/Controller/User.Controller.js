const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET_TOKEN;

const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    if (user) {
      return res.status(201).json({
        message: "User created successfully",
        success: true,
        user,
      });
    }
  } catch (error) {
    console.log("**Error during Signup**", error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "Provided email doesn't exist",
        success: false,
      });
    }
    checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.status(404).json({
        message: "Incorrect Password!",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "1h" });
    return res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    })
    .json({
      message: `Welcome back ${user.username}`,
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = {Signup, login}