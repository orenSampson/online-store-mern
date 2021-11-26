const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categories/categoriesController");

router.get("/getcategories", categoriesController.getCategories);

module.exports = router;
