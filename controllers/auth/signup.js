const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
// const { nanoid } = require('nanoid');
// const { BASE_URL } = process.env;

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400).json({ message: 'Name, email or password not found' });
    return;
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: 'Email in use' });
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    city: newUser.city,
    phone: newUser.phone,
  });
};

module.exports = signup;
