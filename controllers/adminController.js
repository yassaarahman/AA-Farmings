const Product = require("../models/products");

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product | AA-Farmings",
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const productID = req.params.productID;
  const editing = req.query.editing === "true";

  Product.fetchProductByID(productID, (product) => {
    if (!product) {
      console.log("Product not found for editing!");
      return res.redirect("/admin-product-list");
    }

    console.log(productID, editing, product);
    res.render("admin/edit-product", {
      product,
      editing,
      pageTitle: "Edit Product | AA Farmings",
    });
  });
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
