const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { error } = require("console");
const { data } = require("autoprefixer");
const { json } = require("body-parser");

const homeDataPath = path.join(rootDir, "data", "productData.json");

module.exports = class Product {
  constructor(Name, Price, Rating, imageUrl, description) {
    this.Name = Name;
    this.Price = Price;
    this.Rating = Rating;
    this.imageUrl = imageUrl;
    this.description = description;
    this.productID = Math.floor(Math.random() * 100).toString();
  }

  save() {
    Product.fetchAll((products) => {
      products.push(this);
      fs.writeFile(homeDataPath, JSON.stringify(products), (error) => {
        console.log("File Writing done ", error);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
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
