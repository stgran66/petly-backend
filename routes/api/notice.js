const express = require('express');
const router = express.Router();
const { notice: ctrl } = require('../../controllers');

router.get('/', ctrl.listNotices);
router.get('/:noticeId', ctrl.getNoticeById);

module.exports = router;
