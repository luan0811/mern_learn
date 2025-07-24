import UserModel from '../models/User';

export const findByEmail = (email: string) => UserModel.findOne({ email });
export const createUser = (data: any) => new UserModel(data).save();
