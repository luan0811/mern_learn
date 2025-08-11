import UserModel, { IUserDocument } from "../models/User";
import { IUser } from "../interfaces/user.interface";

export class UserRepository {
  async create(user: IUser): Promise<IUserDocument> {
    return await UserModel.create(user);
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return await UserModel.findOne({ email });
  }
}
