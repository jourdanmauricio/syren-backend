import { Request, Response } from 'express';
import { User } from '../../entities/User';
import { UsersService } from '../../services/usersService';
import { catchAsync } from '../../utils/catchAsync';

const usersService = UsersService.getInstance();

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users: User[] = await usersService.getAll();
  res.status(200).json(users);
});
