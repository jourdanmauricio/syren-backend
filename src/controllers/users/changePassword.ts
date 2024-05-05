import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import bcrypt from 'bcrypt';
import { CredentialsService } from '../../services/credentialsServices';
import CredentialRepository from '../../repositories/CredentialRepository';

const credentialsService = CredentialsService.getInstance();

export interface CustomRequest extends Request {
  id: number;
}

export const changePass = catchAsync(async (req: Request, res: Response) => {
  const { password } = req.body;
  const { id } = req.params;

  const credential = await CredentialRepository.findById(Number(id));

  const hashPass = await bcrypt.hash(password, 10);

  await credentialsService.update(credential.id, {
    password: hashPass,
  });

  res.status(200).json({
    statusCode: 200,
    error: null,
    message: 'Contraeña modificada',
  });
});
