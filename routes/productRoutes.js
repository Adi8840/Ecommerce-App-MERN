import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  ProductPhotoController,
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//Routes
//Create Product
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProductController
);

//Get Products
router.get("/get-product", getProductController);

//Get Single Product
router.get("/get-product/:slug", getSingleProductController);

//Get Photo
router.get("/product-photo/:pid", ProductPhotoController);

//Delete Product
router.delete("/delete-product/:pid", deleteProductController);

//Update Product
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  updateProductController
);

//Filter Product
router.post("/product-filters", productFilterController);

//Count Product
router.get("/product-count", productCountController);

//Product perPage
router.get("/product-list/:page", productListController);

//Search product
router.get("/search/:keyword", searchProductController);

//Releted Product
router.get("/related-product/:pid/:cid", relatedProductController);

//Category Wise Product
router.get("/product-category/:slug", productCategoryController);

//Payment Routes
//Token
router.get("/braintree/token", braintreeTokenController);

//Payment Route
router.post("/braintree/payment", requireSignin, braintreePaymentController);

export default router;
