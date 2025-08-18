import '../docs/auth.docs'
import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export class AuthController {

  
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);
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
      const result = await authService.login(email, password);

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
