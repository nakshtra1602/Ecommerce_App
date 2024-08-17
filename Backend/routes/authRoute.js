import { Router } from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, protectedRoutes } from "../middlewares/authMiddleware.js";

const router = new Router();

router.route("/register").post(registerController);

router.route("/login").post(loginController);

router.route("/forgot-password").post(forgotPasswordController);

router.route("/test").get(protectedRoutes, isAdmin, async (req, res) => {
  res.send("heya lol");
});

//protected route auth
router.route("/user-auth").get(protectedRoutes, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected admin route auth
router.route("/admin-auth").get(protectedRoutes, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.route("/profile").post(protectedRoutes, updateProfileController);

router.route("/orders").get(protectedRoutes, getOrdersController);

router
  .route("/all-orders")
  .get(protectedRoutes, isAdmin, getAllOrdersController);

router
  .route("/order-status/:orderId")
  .post(protectedRoutes, isAdmin, orderStatusController);

export default router;
