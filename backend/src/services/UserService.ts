import { UserRepository } from "../repositories/UserRepository";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { IUser } from "../interfaces/user.interface";
import bcrypt from "bcrypt";

export class UserService {
    private userRepository: UserRepository;
    private refreshTokenRepository: RefreshTokenRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.refreshTokenRepository = new RefreshTokenRepository();
    }

    async createUser(userData: IUser): Promise<IUser> {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error("User already exists");
        }
         const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
        const newUser = await this.userRepository.create(userData);
        return newUser;
    }

    async getAllUsers(): Promise<IUser[]> {
        return await this.userRepository.findAll();
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await this.userRepository.findById(id);
    }

    async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
        return await this.userRepository.updateById(id, userData);
    }

    async deleteUser(id: string): Promise<IUser | null> {
        return await this.userRepository.deleteById(id);
    }
}