const express = require('express');
const router = express.Router();
const { notice: ctrl } = require('../../controllers');

router.get('/:category', ctrl.listNotices);
router.get('/:noticeId', ctrl.getNoticeById);

module.exports = router;
