import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { IUser } from "../interfaces/user.interface";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

export class AuthService {
  private userRepository: UserRepository;
  private refreshTokenRepository: RefreshTokenRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.refreshTokenRepository = new RefreshTokenRepository();
  }

    private generateAccessToken(payload: object) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
  }

  private generateRefreshToken(payload: object) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
  }

  async register(userData: IUser) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = await this.userRepository.create(userData);
    return newUser;
  }
  
   async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate tokens
    const payload = { id: user._id, role: user.role };
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    // Save refresh token to DB
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await this.refreshTokenRepository.create({
      token: refreshToken,
      userId: user._id,
      expiresAt,
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Kiểm tra mật khẩu cũ
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Hash mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu
    await this.userRepository.updateById(userId, { password: hashedNewPassword });

    // Xóa tất cả refresh token của user này để bắt đăng nhập lại
    await this.refreshTokenRepository.deleteByUserId(userId);

    return { message: "Password changed successfully. Please login again." };
  }

  async logout(userId: string, refreshToken?: string) {
    try {
      if (refreshToken) {
        // Xóa refresh token cụ thể
        await this.refreshTokenRepository.deleteByToken(refreshToken);
      } else {
        // Xóa tất cả refresh token của user (logout all devices)
        await this.refreshTokenRepository.deleteByUserId(userId);
      }

      return { message: "Logout successful" };
    } catch (error) {
      throw new Error("Error during logout");
    }
  }
}
