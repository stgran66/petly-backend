const express = require('express');
const router = express.Router();

const healthzCheck = async (req, res) => {
  res.status(200).json('everything is ok');
};
// Logout request
router.get('/', healthzCheck);

module.exports = router;
