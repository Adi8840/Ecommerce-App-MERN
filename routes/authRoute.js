import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  testController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController,
} from "../controllers/authController.js";

import { requireSignin, isAdmin } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);
//Login ||Post
router.post("/login", loginController);

//forget password
router.post("/forgot-password", forgotPasswordController);

//Test Routes
router.get("/test", requireSignin, isAdmin, testController);

//Protected User route auth
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected Admin route auth
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignin, updateProfileController);

//Orders
router.get("/orders", requireSignin, getOrderController);

//All Orders
router.get("/all-orders", requireSignin, isAdmin, getAllOrderController);

//Orders status Update
router.put(
  "/order-status/:orderId",
  requireSignin,
  isAdmin,
  orderStatusController
);

export default router;
