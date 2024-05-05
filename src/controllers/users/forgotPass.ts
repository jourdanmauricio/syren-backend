import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import jwt from 'jsonwebtoken';
import { config } from '../../config/envs';
import { UsersService } from '../../services/usersService';
import { CredentialsService } from '../../services/credentialsServices';

const usersService = UsersService.getInstance();
const credentialsService = CredentialsService.getInstance();

export const forgotPass = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await usersService.getUserByEmail(email);

  // Envío el credential id en pyload
  const payload = {
    id: user.credential.id,
  };
  const token = jwt.sign(payload, config.jwtSecret!, {
    expiresIn: '15m',
  });

  await credentialsService.update(user.credential.id, {
    recoveryToken: token,
  });

  res
    .status(200)
    .json({ statusCode: 200, error: null, message: 'Recovery ready' });
});
