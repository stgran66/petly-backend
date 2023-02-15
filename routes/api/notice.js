const express = require('express');
const router = express.Router();
const { notice: noticeCtrl } = require('../../controllers');
const { user: userCtrl } = require('../../controllers');
const { authenticate, upload } = require('../../middlewares');
const { schemas: userSchemas } = require('../../models/user');
const { schemas: noticeSchemas } = require('../../models/notice');

router.get('/:category', noticeCtrl.listNotices);

router.get('/favorite', authenticate, userCtrl.listFavorite);

router.get('/own', authenticate, noticeCtrl.listOwnersNotices);

router.get('/:noticeId', userSchemas.idValidation, noticeCtrl.getNoticeById);

router.post(
  '/:noticeId/favorite',
  userSchemas.idValidation,
  authenticate,
  userCtrl.addToFavorite
);
router.post(
  '/:noticeId/remove-favorite',
  userSchemas.idValidation,
  authenticate,
  userCtrl.removeFavorite
);
router.post(
  '/',
  authenticate,
  upload.single('imageUrl'),
  noticeSchemas.addNoticeValidation,
  noticeCtrl.addNotice
);
router.delete(
  '/:noticeId',
  userSchemas.idValidation,
  authenticate,
  noticeCtrl.removeNotice
);

module.exports = router;
