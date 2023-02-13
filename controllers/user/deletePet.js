const { User } = require('../../models');
const { Pet } = require('../../models');

const httpError = require('../../helpers/httpError');

const deletePet = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Pet.findByIdAndDelete(id);

  if (!result) {
    throw httpError(404);
  }

  await User.findByIdAndUpdate(owner, {
    $pull: { pets: id },
  });

  res.json({ message: 'pet deleted' });
};

module.exports = deletePet;
