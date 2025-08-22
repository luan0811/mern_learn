import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid or missing Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  console.log('ACCESS_TOKEN_SECRET in verifyToken:', process.env.ACCESS_TOKEN_SECRET);
  if (!process.env.ACCESS_TOKEN_SECRET) {
    console.error('ACCESS_TOKEN_SECRET is not defined');
    return res.status(500).json({ message: 'Server configuration error: Missing ACCESS_TOKEN_SECRET' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('Decoded Token:', decoded);

    if (typeof decoded === 'object' && decoded !== null) {
      req.user = decoded as IUser;
    } else {
      return res.status(403).json({ message: 'Invalid token payload' });
    }
    next();
  } catch (err: any) {
    console.error('JWT Verification Error:', {
      message: err.message,
      name: err.name,
      stack: err.stack,
    });
    return res.status(403).json({ message: 'Invalid token', error: err.message });
  }
};