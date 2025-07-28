import RefreshTokenModel from '../models/RefreshToken';

export const create = (data: any) => new RefreshTokenModel(data).save();
export const findByToken = (token: string) => RefreshTokenModel.findOne({ token });
export const deleteByToken = (token: string) => RefreshTokenModel.deleteOne({ token });