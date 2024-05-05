import { Request, Response } from 'express';
import { User } from '../../entities/User';
import { UsersService } from '../../services/usersService';

const usersService = UsersService.getInstance();

import { CredentialsService } from '../../services/credentialsServices';
import { catchAsync } from '../../utils/catchAsync';
import { Credential } from '../../entities/Credential';

const credentialsService = CredentialsService.getInstance();

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, birthdate, nDni, username, password, role } = req.body;

  const newCredential: Credential = await credentialsService.create({
    username,
    password,
    role,
  });

  const newUser: User = await usersService.create({
    name,
    email,
    birthdate,
    nDni,
    credential: newCredential,
  });
  res.status(201).json(newUser);
});
