const { User } = require('../../models');
const httpError = require('../../helpers/httpError');

const deletePet = async (req, res) => {
  console.log('searching');
  const { id } = req.params;

  const result = await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $pull: { pets: { _id: id } },
    },
    { new: true }
  );

  if (!result) {
    console.log(req.params);
    console.error('not found');
    throw httpError(404);
  }
  res.json({ message: 'pet deleted' });
};

module.exports = deletePet;
