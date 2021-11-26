const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth/authMiddleware");
const addTransactionController = require("../controllers/transactions/addTransactionController");
const transactionsHistoryController = require("../controllers/transactions/transactionsHistoryController");
const getDiscountController = require("../controllers/transactions/getDiscountController");

router.post("/addtransaction", authMiddleware, addTransactionController);

router.get(
  "/transactionshistory",
  authMiddleware,
  transactionsHistoryController
);

router.get("/getdiscounts", getDiscountController);

module.exports = router;
