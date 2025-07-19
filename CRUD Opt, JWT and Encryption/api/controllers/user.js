const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/users");

const UserCtrl = {
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    const userExist = await Users.findOne({ email });
    if (userExist) {
      throw new Error("User already existed....");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCreated = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({
      message: "User registered successfully.....",
      username: userCreated.username,
      email: userCreated.email,
      password: userCreated.password,
      id: userCreated._id,
    });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userFound = await Users.findOne({ email });
    if (!userFound) {
      res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      throw new Error("Invalid email or password...");
    }

    const token = jwt.sign({ id: userFound._id }, "token", {
      expiresIn: "30d",
    });

    res.json({
      message: "Login Successful ",
      username: userFound.username,
      email: userFound.email,
      id: userFound._id,
      token,
    });
  }),

  getProfile: asyncHandler(async (req, res) => {
    const userFound = await Users.findById(req.user);

    if (!userFound) {
      res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      username: userFound.username,
      email: userFound.email,
      id: userFound._id,
    });
  }),

  updateProfile: asyncHandler(async (req, res) => {
    const userId = await Users.findById(req.user);
    const { id } = userId;

    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userFound = await Users.findByIdAndUpdate(id, {
      username,
      email,
      password: hashedPassword,
    });

    res.json({
      message: "User Profile Updated",
      username: userFound.username,
      email: userFound.email,
      id: userFound._id,
    });
  }),

  deleteProf: asyncHandler(async (req, res) => {
    const userId = await Users.findById(req.user);
    const { id } = userId;

    const userFound = await Users.findByIdAndDelete(id);
    res.json({
      message: "User Profile Deleted",
      userFound,
    });
  }),
};

module.exports = UserCtrl;
