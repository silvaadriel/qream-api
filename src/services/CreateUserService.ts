import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/Users';

interface Request {
  name: string;
  credential: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, credential, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { credential },
    });

    if (checkUserExists) {
      throw new AppError('Credential address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      credential,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;
