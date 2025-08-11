import '../docs/auth.docs'
import { Request, Response } from "express";
import { UserService } from "../services/AuthService";

const userService = new UserService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await userService.register(req.body);
      res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);

      res.status(200).json({
        message: "Login successful",
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
