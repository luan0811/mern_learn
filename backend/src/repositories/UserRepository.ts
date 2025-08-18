import UserModel, { IUserDocument } from "../models/User";
import { IUser } from "../interfaces/user.interface";

export class UserRepository {
  async create(user: IUser): Promise<IUserDocument> {
    return await UserModel.create(user);
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return await UserModel.findOne({ email });
  }

  async findAll(): Promise<IUserDocument[]> {
    return await UserModel.find();
  }

  async findById(id: string): Promise<IUserDocument | null> {
    return await UserModel.findById(id);
  }

  async updateById(id: string, userData: Partial<IUser>): Promise<IUserDocument | null> {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async deleteById(id: string): Promise<IUserDocument | null> {
    return await UserModel.findByIdAndDelete(id);
  }
}
