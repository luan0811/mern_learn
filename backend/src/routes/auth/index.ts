import { AuthController } from './../../controllers/AuthController';
import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { isAdmin } from "../../middlewares/auth.middleware";

const router = Router();
const authController = new AuthController();

router.post("/register",authController.register);//test
router.post("/login", authController.login);

export default router;
