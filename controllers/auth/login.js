const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
// webtoken
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!email || !password || user === null) {
    res.status(401).json({ message: 'Email or password is wrong' }); // "Email invalid"
    return;
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    res.status(401).json({ message: 'Email or password is wrong' }); // "Password invalid"
    return;
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '20h' });

  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    user: email,
    token: token,
  });
};

module.exports = login;
