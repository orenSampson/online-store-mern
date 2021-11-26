const { body } = require("express-validator");

const User = require("../../models/user");
const { PASSWORD_MIN_LENGTH } = require("../../constants/auth");
const {
  notValidEmailMsg,
  emailInUseMsg,
  passwordTooShortMsg,
} = require("../../constants/responses");

exports.signupValidator = [
  body("email")
    .isEmail()
    .withMessage(notValidEmailMsg)
    .normalizeEmail()
    .custom(async (value) => {
      const userCount = await User.countDocuments({ email: value });
      if (userCount) {
        return Promise.reject();
      }
    })
    .withMessage(emailInUseMsg),
  body("password")
    .trim()
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(passwordTooShortMsg),
];

exports.loginValidator = [
  body("email").isEmail().withMessage(notValidEmailMsg).normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(passwordTooShortMsg),
];
