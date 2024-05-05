import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import jwt from 'jsonwebtoken';
import { Credential } from '../../entities/Credential';
import { config } from '../../config/envs';
import { UsersService } from '../../services/usersService';
import { User } from '../../entities/User';

const usersService = UsersService.getInstance();

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const credential = <Credential>req.user;

  const payload = {
    id: credential.id,
    role: credential.role,
  };
  const token = jwt.sign(payload, config.jwtSecret!);

  const user: User = await usersService.getUser(Number(credential.id));

  const { id, role, username } = credential;
  const { name, image } = user;

  res.json({
    user: { id, role, username, name, image },
    token,
    isLogged: true,
  });
});
