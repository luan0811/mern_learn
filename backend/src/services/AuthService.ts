import * as UserRepo from "../repositories/UserRepository";
import * as RefreshTokenRepo from "../repositories/RefreshTokenRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";


export const register = async (email: string, password: string) => {
  const existingUser = await UserRepo.findByEmail(email);
  if (existingUser) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(password, 10);
  return await UserRepo.createUser({ email, password: hashed });
};

export const login = async (email: string, password: string) => {
  const user = await UserRepo.findByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  if (!user.isActive) throw new Error("Account is deactivated");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error("Invalid email or password");

  // Ensure JWT_SECRET is defined
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  const accessToken = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    jwtSecret, // Use the validated secret
    { expiresIn: process.env.JWT_EXPIRES_IN as unknown as number || "15m" }
  );

  const refreshToken = uuidv4();
  const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await RefreshTokenRepo.create({
    token: refreshToken,
    userId: user._id,
    expiresAt: refreshTokenExpiry,
  });

  const { password: _, ...userWithoutPassword } = user.toObject();

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  };
};
