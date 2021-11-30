const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const initProductsSeeder = require("./seeders/productsSeeder");
const initCategoriesSeeder = require("./seeders/categoriesSeeder");
const initDiscountsSeeder = require("./seeders/discountsSeeder");
const productsRoutes = require("./routes/productsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const transactionsRoutes = require("./routes/transactionsRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

// database configuration
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/fakeStore";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(MONGODB_URI, options);

mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open to " + MONGODB_URI);
  initProductsSeeder();
  initCategoriesSeeder();
  initDiscountsSeeder();
});

// routes
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// app start configuration
const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log("Running fake store backend on port " + PORT);
});
