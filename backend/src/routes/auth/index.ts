import { AuthController } from './../../controllers/AuthController';
import { Router } from "express";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
