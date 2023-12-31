import bcrypt from 'bcrypt';
import { invalidEmailError } from '@/erros';
import { userRepository } from '@/repositories';

async function createUser(email: string, password: string) {
  await verifyUser(email);
  const hash = await bcrypt.hash(password, 12);

  const newUser = await userRepository.createUser(email, hash);

  return newUser;
}

async function verifyUser(email: string) {
  const response = await userRepository.findByEmail(email);
  if (response) throw invalidEmailError(email);
}

export const userService = {
  createUser,
};
