import mongoose, { Document, Schema, Types } from "mongoose";
import { IUser } from "../interfaces/user.interface";

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, trim: true, maxLength: 150 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isActive: { type: Boolean, default: true },
    avatar: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/meocamp-b6231.appspot.com/o/avt.png?alt=media&token=14e9a221-2eae-410d-926e-720ded483a81",
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

export default mongoose.model<IUserDocument>(DOCUMENT_NAME, userSchema);
