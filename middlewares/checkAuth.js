const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const { User } = require('../models');

const checkAuth = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next();
    return;
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || token !== String(user.token)) {
      next();
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    next();
  }
};

module.exports = checkAuth;
