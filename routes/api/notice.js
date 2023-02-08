const express = require('express');
const router = express.Router();
const { notice: noticeCtrl } = require('../../controllers');
const { user: userCtrl } = require('../../controllers');
const { authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

router.get('/:category', noticeCtrl.listNotices);
router.get('/:noticeId', noticeCtrl.getNoticeById);
router.get('/favorite/a', authenticate, userCtrl.listFavorite);
router.post(
  '/:noticeId/favorite',
  schemas.idValidation,
  authenticate,
  userCtrl.addToFavorite
);

module.exports = router;
