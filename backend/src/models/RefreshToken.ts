import mongoose from 'mongoose';


const DOCUMENT_NAME = 'RefreshToken';
const COLLECTION_NAME = 'RefreshTokens';
const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date, required: true },
}, {
  collection: COLLECTION_NAME,
  timestamps: true,
});

export default mongoose.model(DOCUMENT_NAME, refreshTokenSchema);