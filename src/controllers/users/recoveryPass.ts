import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../../config/envs';
import { CredentialsService } from '../../services/credentialsServices';
import CredentialRepository from '../../repositories/CredentialRepository';
import boom from '@hapi/boom';

const credentialsService = CredentialsService.getInstance();

export interface CustomRequest extends Request {
  id: number;
}

export const recoveryPass = catchAsync(async (req: Request, res: Response) => {
  const { token, password } = req.body;

  const payload = jwt.verify(token, config.jwtSecret!);
  const { id } = payload as CustomRequest;

  const credential = await CredentialRepository.findById(id);

  if (credential.recoveryToken !== token)
    throw boom.unauthorized('Token inválido');

  const hashPass = await bcrypt.hash(password, 10);

  await credentialsService.update(credential.id, {
    recoveryToken: '',
    password: hashPass,
  });

  res.status(200).json({
    statusCode: 200,
    error: null,
    message: 'Contraeña modificada',
  });
});
