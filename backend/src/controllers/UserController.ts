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
}