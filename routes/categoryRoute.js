import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes
//Create Category
router.post(
  "/create-category",
  requireSignin,
  isAdmin,
  createCategoryController
);

//Update Category
router.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  updateCategoryController
);

//GetAll Category
router.get("/get-category", categoryController);

//Single Category
router.get("/single-category/:slug", singleCategoryController);

//Delete Category
router.delete(
  "/delete-category/:id",
  requireSignin,
  isAdmin,
  deleteCategoryController
);

export default router;
