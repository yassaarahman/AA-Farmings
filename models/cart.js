const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const cartDataPath = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addToCart(productID, callback) {
    Cart.getCart((cartProducts) => {
      if (cartProducts.includes(productID)) {
        callback("Product is already in the Cart");
      } else {
        cartProducts.push(productID);
        fs.writeFile(cartDataPath, JSON.stringify(cartProducts), callback);
      }
    });
  }

  static getCart(callback) {
    fs.readFile(cartDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
