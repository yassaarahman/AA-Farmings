const express = require("express");
const storeRouter = express.Router();
const {
  getHome,
  getProducts,
  getCart,
  getProductDetailsByID,
  addToCart
} = require("../controllers/storeController");

storeRouter.get("/home", getHome);
storeRouter.get("/products-list", getProducts);
storeRouter.get("/products-list/:productID", getProductDetailsByID);
storeRouter.get("/cart", getCart);
storeRouter.post("/cart", addToCart);

module.exports = storeRouter;
