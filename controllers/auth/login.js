const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { ACCESS_TOKEN_SECRET } = require("../../constants/auth");
const {
  serverError,
  userNotFound,
  wrongPassword,
  loginSuccessful,
} = require("../../constants/responses");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  const maxAge = 365;

  const email = req.body.email;
  const password = req.body.password;

  let user, isEqual, token;

  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (!user) {
    return res
      .status(userNotFound.status)
      .json({ message: userNotFound.message });
  }

  try {
    isEqual = await bcrypt.compare(password, user.password);
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (!isEqual) {
    return res
      .status(wrongPassword.status)
      .json({ message: wrongPassword.message });
  }

  try {
    token = jwt.sign({ sub: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: maxAge + "d",
    });
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  res.status(loginSuccessful.status).json({
    token,
    message: loginSuccessful.message,
  });
};
