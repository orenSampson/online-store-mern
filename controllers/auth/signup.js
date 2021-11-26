const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../../models/user");
const { userCreated, serverError } = require("../../constants/responses");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  let hashedPassWord;
  try {
    hashedPassWord = await bcrypt.hash(password, 12);
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  const user = new User({
    email: email,
    password: hashedPassWord,
    cart: [],
  });

  try {
    const result = await user.save();
    return res
      .status(userCreated.status)
      .json({ message: userCreated.message, userID: result._id });
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }
};
