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

module.exports = router;
