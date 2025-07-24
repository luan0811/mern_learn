import * as UserRepo from '../repositories/UserRepository';
import bcrypt from 'bcrypt';

export const register = async (email: string, password: string) => {
  const existingUser = await UserRepo.findByEmail(email);
  if (existingUser) throw new Error('Email already exists');

  const hashed = await bcrypt.hash(password, 10);
  return await UserRepo.createUser({ email, password: hashed });
};
