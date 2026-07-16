const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  console.log(req.url, req.method);
  res.render("admin/add-product", { pageTitle: "Add Product | AA Farmings" });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);

  const { Name, Price, Rating, imageUrl, description } = req.body;
  const product = new Product(Name, Price, Rating, imageUrl, description);
  product.save();
  res.render("admin/product-added", {
    pageTitle: "Product Added | AA Farmings",
  });
};

exports.getAdminProductList = (req, res) => {
  const products = Product.fetchAll((products) => {
    res.render("admin/admin-product-list", {
      products,
      pageTitle: "Products",
    });
  });
};
