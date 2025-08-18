import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  const user = req.user; // req.user đã được set ở middleware verifyToken
  if (user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "access_secret", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded; // Set user info to request object
    next();
  });
}
    