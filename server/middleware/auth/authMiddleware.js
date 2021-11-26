const jwt = require("jsonwebtoken");

const {
  ACCESS_TOKEN_SECRET,
  AUTH_COOKIE_NAME,
  AUTH_HEADER_NAME,
} = require("../../constants/auth");

module.exports = (req, res, next) => {
  let token;

  if (req.cookies[AUTH_COOKIE_NAME]) {
    token = req.cookies[AUTH_COOKIE_NAME];
  } else {
    token = req.headers[AUTH_HEADER_NAME]
      ? req.headers[AUTH_HEADER_NAME].split(" ")[1]
      : null;
  }

  res.locals.payload = getPayload(token);

  res.locals.isAuth = !!res.locals.payload;

  return next();
};

const getPayload = (token) => {
  if (!token) {
    return null;
  }

  let decodedTokenPayload;
  try {
    decodedTokenPayload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (!decodedTokenPayload) {
      throw new Error();
    }
  } catch (error) {
    return null;
  }

  return decodedTokenPayload;
};
