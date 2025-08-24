import { UserService } from './../services/UserService';
import { Request, Response } from "express";
import '../docs/user.docs';

const userService = new UserService();

export class UserController {

    async createUser(req: Request, res: Response) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json({
                message: "User created successfully",
                user,
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteUserById(req: Request, res: Response) {
        try {
            const user = await userService.deleteUser(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateUserById(req: Request, res: Response) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({
                message: "User updated successfully",
                user,
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}