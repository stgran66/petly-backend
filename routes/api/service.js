const express = require('express');
const router = express.Router();
const { service: ctrl } = require('../../controllers');

router.get('/', ctrl.listServices);

module.exports = router;
