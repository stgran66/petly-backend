const express = require('express');
const router = express.Router();
const { user: ctrl } = require('../../controllers');
const { authenticate } = require('../../middlewares');

// get user data
router.get('/', authenticate, ctrl.getUserData);

module.exports = router;
