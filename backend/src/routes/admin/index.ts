import { UserController } from "../../controllers/UserController";
import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { isAdmin } from "../../middlewares/auth.middleware";
const userController = new UserController();

const router = Router();

router.post("/AdminCreateUser", verifyToken, isAdmin, (req, res) => userController.createUser(req, res));
router.get("/AdminGetAllUsers", verifyToken, isAdmin, (req, res) => userController.getAllUsers(req, res));
router.get("/AdminGetUserById/:id", verifyToken, isAdmin, (req, res) => userController.getUserById(req, res));
router.delete("/AdminDeleteUserById/:id", verifyToken, isAdmin, (req, res) => userController.deleteUserById(req, res));
router.put("/AdminUpdateUserById/:id", verifyToken, isAdmin, (req, res) => userController.updateUserById(req, res));

export default router;
