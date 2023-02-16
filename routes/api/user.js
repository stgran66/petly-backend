const express = require('express');
const router = express.Router();
const { user: ctrl } = require('../../controllers');
const { authenticate, validation, upload } = require('../../middlewares');
const { validateId } = require('../../middlewares');
const { addPetSchema, updatePetSchema } = require('../../models/pet');

// get user data
router.get('/', authenticate, ctrl.getUserData);

router.post(
  '/pet',
  authenticate,
  upload.single('photo'),
  validation(addPetSchema),
  ctrl.addPet
);

router.put(
  '/pet/:id',
  validateId,
  authenticate,
  upload.single('photo'),
  validation(updatePetSchema),
  ctrl.updatePet
);

router.delete('/pet/:id', authenticate, validateId, ctrl.deletePet);

module.exports = router;
