const Product = require("../models/products");

exports.getHome = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("store/home", {
      products,
      pageTitle: "Home | AA Farmings",
    });
  });
};

exports.getProducts = (req, res) => {
  const products = Product.fetchAll((products) => {
    res.render("store/products-list", {
      products,
      pageTitle: "Products",
    });
  });
};

exports.getProductDetailsByID = (req, res) => {
  const productID = req.params.productID;
  Product.fetchProductByID(productID, (product) => {
    if (!product) {
      res.redirect("/products-list");
    } else {
      res.render("store/product-details", {
        pageTitle: "Details",
        product,
      });
    }
  });
};

exports.getCart = (req, res) => {
  res.render("store/cart", {
    pageTitle: "Cart",
  });
};

exports.addToCart = (req, res) => {
  console.log("Product added to Cart", req.body);
  res.redirect("/cart");
};
