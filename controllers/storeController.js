const Product = require("../models/products");
const Cart = require("../models/cart");

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

// Method 01:
/* exports.getCart = (req, res) => {
   Cart.getCart((cartProducts) => {
     Product.fetchAll((products) => {
       cartProductsWithDetails = cartProducts.map((productID) =>
         products.find((product) => product.productID === productID),
       );
     });
   });
   res.render("store/cart", {
     cartProducts: cartProductsWithDetails,
     pageTitle: "Cart",
   });
 }; */
exports.getCart = (req, res) => {
  Cart.getCart((cartProducts) => {
    Product.fetchAll((products) => {
      const cartProductsWithDetails = products.filter((product) =>
        cartProducts.includes(product.productID),
      );
      res.render("store/cart", {
        cartProductsWithDetails,
        pageTitle: "Cart",
      });
    });
  });
};

exports.addToCart = (req, res) => {
  Cart.addToCart(req.body.productID, (error) => {
    if (error) {
      console.log("Error occured while adding to cart", `"${error}"`);
    }
    res.redirect("/cart");
  });
};
