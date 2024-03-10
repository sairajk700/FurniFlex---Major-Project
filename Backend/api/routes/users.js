const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

const User = require('../models/user');
const UserController = require('../controllers/user');

// Get all users data
router.get('/', UserController.all_users);

// Logout
router.get('/:userId/logout', UserController.user_logout);

// Login
router.post('/login', UserController.user_login);

// Delete user
router.delete('/:userId', UserController.user_delete);

// Update user name & phone number
router.put('/:userId', UserController.user_update);

// Register new user
router.post('/signup', [
  check('name').not().isEmpty().withMessage('Name cannot be empty'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('phoneNumber').isNumeric().withMessage('Phone number must contain only numbers'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])/).withMessage('Password must contain at least one letter and one number')
], UserController.user_signup);

// Change password
router.post('/:userId/change', [
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])/).withMessage('Password must contain at least one letter and one number')
], UserController.change_password);

module.exports = router;
