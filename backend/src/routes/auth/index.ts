import { AuthController } from "./../../controllers/AuthController";
import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.put("/change-password", verifyToken, authController.changePassword);
router.post("/logout", verifyToken, authController.logout);

export default router;
