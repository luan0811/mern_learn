import { Request, Response } from 'express';
import * as AuthService from '../services/AuthService';
import '../docs/auth.docs'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.register(email, password);
    res.status(201).json({ user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
