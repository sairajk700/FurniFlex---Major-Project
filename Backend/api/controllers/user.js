const express = require('express');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require("../models/user");

exports.user_signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).json({ message: "Account with this email already registered" });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          password: hashedPassword,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ phoneNumber: savedUser.phoneNumber, email: savedUser.email }, process.env.JWT_SECRET);
        return res.status(201).json({ message: "User created", token });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.user_login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Auth failed' });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Auth failed' });
    }
    const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Auth successful', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.user_delete = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.userId });
    return res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.user_update = async (req, res, next) => {
  try {
    await User.updateOne({ _id: req.params.userId }, { $set: req.body });
    return res.status(200).json({ message: 'User updated' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.change_password = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const user = await User.findById(req.params.userId);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
      await user.save();
      return res.status(201).json({ message: "Password changed" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.all_users = async (req, res, next) => {
  try {
    const result = await User.find({});
    return res.status(200).json({ result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.user_logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ message: 'Logged out successfully' });
    }
  });
};
