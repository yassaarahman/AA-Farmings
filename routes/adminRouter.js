const express = require("express");
const adminRouter = express.Router();
const {
  getAddProduct,
  postAddProduct,
  getAdminProductList,
  getEditProduct,
} = require("../controllers/adminController");

adminRouter.get("/admin-home", (req, res, next) => {
  res.render("admin/admin-home", { pageTitle: "Home | Admin" });
});

adminRouter.get("/edit-Product", getAddProduct);

adminRouter.get("/edit-Product/:productID", getEditProduct);

adminRouter.get("/add-Product", getAddProduct);
adminRouter.post("/add-Product", postAddProduct);

adminRouter.get("/admin-product-list", getAdminProductList);

exports.adminRouter = adminRouter;
