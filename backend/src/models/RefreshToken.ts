import mongoose, { Document, Schema } from "mongoose";
import { IRefreshToken } from "../interfaces/refresh-token.interface";

export interface IRefreshTokenDocument extends IRefreshToken, Document {}

const DOCUMENT_NAME = "RefreshToken";
const COLLECTION_NAME = "RefreshTokens";

const refreshTokenSchema = new Schema<IRefreshTokenDocument>(
  {
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

export default mongoose.model<IRefreshTokenDocument>(
  DOCUMENT_NAME,
  refreshTokenSchema
);
