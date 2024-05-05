import { Request, Response } from 'express';
import { User } from '../../entities/User.entity';
import { UsersService } from '../../services/usersService';
import { catchAsync } from '../../utils/catchAsync';

const usersService = UsersService.getInstance();

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user: User = await usersService.getUser(Number(id));
  res.status(200).json(user);
});
