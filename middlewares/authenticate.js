const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const { User } = require('../models');
const { httpError } = require('../helpers');

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(httpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || token !== String(user.token)) {
      next(httpError(401));
    }
    req.user = user;

    next();
  } catch (error) {
    next(next(httpError(401)));
  }
};

module.exports = authenticate;
