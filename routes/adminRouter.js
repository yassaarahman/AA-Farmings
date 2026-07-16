const express = require("express");
const adminRouter = express.Router();
const {
  getAddProduct,
  postAddProduct,
  getAdminProductList,
} = require("../controllers/adminController");

adminRouter.get("/add-Product", getAddProduct);

adminRouter.post("/add-Product", postAddProduct);

adminRouter.get("/admin-home", (req, res, next) => {
  res.render("admin/admin-home", { pageTitle: "Home | Admin" });
});

adminRouter.get("/edit-product", (req, res) => {
  res.render("admin/edit-product", { pageTitle: "Edit Product | Admin" });
});

adminRouter.get("/admin-product-list", getAdminProductList)

exports.adminRouter = adminRouter;
