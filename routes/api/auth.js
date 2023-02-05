const express = require('express');
const router = express.Router();
const { auth: ctrl } = require('../../controllers');
const { validation, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/user');

// signup
router.post('/signup', validation(schemas.signupSchema), ctrl.signup);

// login
router.post('/login', validation(schemas.loginSchema), ctrl.login);

// Logout request
router.get('/logout', authenticate, ctrl.logout);

module.exports = router;