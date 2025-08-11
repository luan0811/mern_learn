// src/interfaces/user.interface.ts
export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  isActive?: boolean;
  avatar?: string;
}
