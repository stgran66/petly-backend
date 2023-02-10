const express = require('express');
const router = express.Router();
const { user: ctrl } = require('../../controllers');
const { authenticate, validation, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');
const { validateId } = require('../../middlewares');

// get user data
router.get('/', authenticate, ctrl.getUserData);

router.post(
  '/pet',
  authenticate,
  upload.single('photo'),
  validation(schemas.addPetSchema),
  ctrl.addPet
);

router.delete('/pet/:id', authenticate, validateId, ctrl.deletePet);

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

module.exports = router;
