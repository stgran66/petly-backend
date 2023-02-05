const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  const { email, password, name, city, phone } = req.body;
  console.log(req.body);
  console.log(email);
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: 'Email in use' });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = signup;
