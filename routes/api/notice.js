const express = require('express');
const router = express.Router();
const { notice: ctrl } = require('../../controllers');
const { authenticate } = require('../../middlewares');

router.get('/:category', ctrl.listNotices);
router.get('/:noticeId', ctrl.getNoticeById);
router.post('/:noticeId/favorite', authenticate, ctrl.addToFavorite);

module.exports = router;
