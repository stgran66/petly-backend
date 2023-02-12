const express = require('express');
const router = express.Router();
const { auth: ctrl } = require('../../controllers');
const { validation, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

// signup
router.post('/signup', validation(schemas.signupSchema), ctrl.signup);

// login
router.post('/login', validation(schemas.loginSchema), ctrl.login);

// Logout request
router.get('/logout', authenticate, ctrl.logout);

// Avatar update
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);

// User data update
router.put(
  '/update',
  authenticate,
  validation(schemas.updateUserSchema),
  ctrl.updateUserData
);

// Gets current user by token
router.get('/current', authenticate, ctrl.getCurrent);

module.exports = router;
