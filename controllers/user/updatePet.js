const { Pet } = require('../../models');
const { httpError, cloudinaryUpload } = require('../../helpers');

const updatePet = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const body = { ...req.body };
  const petToUpd = await Pet.findById(id);

  if (!petToUpd) {
    throw httpError(404);
  }
  const { photo, name } = petToUpd;

  if (!_id.equals(petToUpd.owner)) {
    throw httpError(401);
  }

  let photoUrl;
  if (req.file) {
    const { path } = req.file;
    photoUrl = path ? await cloudinaryUpload(name, path) : photo;
  }

  const updatedPet = await Pet.findByIdAndUpdate(
    { _id: id },
    { ...body, photo: photoUrl },
    {
      new: true,
    }
  );

  res.status(200).json(updatedPet);
};

module.exports = updatePet;
