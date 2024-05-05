import { Request, Response, NextFunction } from 'express';

type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchAsync = (controller: Controller) => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res, next).catch((err) => {
      next(err);
    });
  };
};
