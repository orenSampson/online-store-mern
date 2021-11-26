const express = require("express");
const router = express.Router();

const signup = require("../controllers/auth/signup");
const login = require("../controllers/auth/login");
const {
  signupValidator,
  loginValidator,
} = require("../middleware/validators/authValidators");

router.put("/signup", signupValidator, signup);

router.post("/login", loginValidator, login);

module.exports = router;
