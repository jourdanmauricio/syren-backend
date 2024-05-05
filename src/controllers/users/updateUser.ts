import { Request, Response } from 'express';
import { User } from '../../entities/User';
import { UsersService } from '../../services/usersService';
import { catchAsync } from '../../utils/catchAsync';

const usersService = UsersService.getInstance();

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const changes = req.body;
  const user: User = await usersService.updateUser(Number(id), changes);
  res.status(200).json(user);
});
