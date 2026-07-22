const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { error } = require("console");
const { data } = require("autoprefixer");
const { json } = require("body-parser");

const productDataPath = path.join(rootDir, "data", "productData.json");

module.exports = class Product {
  constructor(Name, Price, Rating, imageUrl, description) {
    this.Name = Name;
    this.Price = Price;
    this.Rating = Rating;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    Product.fetchAll((products) => {
      if (this.productID) {
        products = products.map((product) =>
          product.productID === this.productID ? this : product,
        );
      } else {
        this.productID = Math.floor(Math.random() * 100).toString();
        products.push(this);
      }
      fs.writeFile(productDataPath, JSON.stringify(products), (error) => {
        console.log("Error occured ", error);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(productDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static fetchProductByID(id, callback) {
    this.fetchAll((products) => {
      const productFound = products.find((product) => product.productID === id);
      callback(productFound);
    });
  }
};
