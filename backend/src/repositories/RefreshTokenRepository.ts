import RefreshTokenModel, { IRefreshTokenDocument } from "../models/RefreshToken";
import { IRefreshToken } from "../interfaces/refresh-token.interface";

export class RefreshTokenRepository {
  async create(tokenData: IRefreshToken): Promise<IRefreshTokenDocument> {
    return await RefreshTokenModel.create(tokenData);
  }

  async findByToken(token: string): Promise<IRefreshTokenDocument | null> {
    return await RefreshTokenModel.findOne({ token });
  }

  async deleteByToken(token: string): Promise<void> {
    await RefreshTokenModel.deleteOne({ token });
  }
}
