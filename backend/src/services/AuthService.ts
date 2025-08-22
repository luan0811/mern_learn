import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { RefreshTokenRepository } from '../repositories/RefreshTokenRepository';
import { IUser } from '../interfaces/user.interface';

export class AuthService {
  private userRepository: UserRepository;
  private refreshTokenRepository: RefreshTokenRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.refreshTokenRepository = new RefreshTokenRepository();
  }

  private generateAccessToken(payload: object) {
    console.log('ACCESS_TOKEN_SECRET in generateAccessToken:', process.env.ACCESS_TOKEN_SECRET);
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error('ACCESS_TOKEN_SECRET is not defined in environment variables');
    }
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  }

  private generateRefreshToken(payload: object) {
    console.log('REFRESH_TOKEN_SECRET in generateRefreshToken:', process.env.REFRESH_TOKEN_SECRET);
    if (!process.env.REFRESH_TOKEN_SECRET) {
      throw new Error('REFRESH_TOKEN_SECRET is not defined in environment variables');
    }
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
  }

  async register(userData: IUser) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = await this.userRepository.create(userData);
    return newUser;
  }

  async login(email: string, password: string) {
    console.log('Environment Variables in login:', {
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
      REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    });

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const payload = { id: user._id, role: user.role, email: user.email };
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

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
      throw new Error('User not found');
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.updateById(userId, { password: hashedNewPassword });
    await this.refreshTokenRepository.deleteByUserId(userId);

    return { message: 'Password changed successfully. Please login again.' };
  }

  async logout(userId: string, refreshToken?: string) {
    try {
      if (refreshToken) {
        await this.refreshTokenRepository.deleteByToken(refreshToken);
      } else {
        await this.refreshTokenRepository.deleteByUserId(userId);
      }
      return { message: 'Logout successful' };
    } catch (error) {
      throw new Error('Error during logout');
    }
  }
}