const express = require('express');
const router = express.Router();
const { user: ctrl } = require('../../controllers');
const { authenticate, validation, upload } = require('../../middlewares');
const { validateId } = require('../../middlewares');
const { addPetSchema } = require('../../models/pet');

// get user data
router.get('/', authenticate, ctrl.getUserData);

router.post(
  '/pet',
  authenticate,
  upload.single('photo'),
  validation(addPetSchema),
  ctrl.addPet
);

router.delete('/pet/:id', authenticate, validateId, ctrl.deletePet);

module.exports = router;
