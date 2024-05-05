import { Router } from 'express';
import passport from 'passport';
import {
  registerUser,
  getAllUsers,
  getUser,
  loginUser,
  uploadImage,
  changePass,
  forgotPass,
  recoveryPass,
  updateUser,
} from '../controllers';
import { isAdmin, checkRoles } from './../middlewares/auth';
import validatorHandler from '../middlewares/validatorHandler';
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  recoveryPassSchema,
  changePassSchema,
} from '../schemas/userSchema';
import { upload } from '../middlewares/multer';
import { TUserRole } from '../entities/Credential';

const usersRouter: Router = Router();

usersRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  getAllUsers
);
usersRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(true, TUserRole.ADMIN, TUserRole.USER),
  validatorHandler(getUserSchema, 'params'),
  getUser
);

usersRouter.put(
  '/forgot-password',
  validatorHandler(updateUserSchema, 'body'),
  forgotPass
);

usersRouter.put(
  '/recovery-password',
  validatorHandler(recoveryPassSchema, 'body'),
  recoveryPass
);

usersRouter.put(
  '/change-pass/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(true, TUserRole.ADMIN, TUserRole.USER),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(changePassSchema, 'body'),
  changePass
);

usersRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(true, TUserRole.ADMIN, TUserRole.USER),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  updateUser
);

usersRouter.post('/upload-image', upload.single('image'), uploadImage);

usersRouter.post(
  '/register',
  validatorHandler(createUserSchema, 'body'),
  registerUser
);

usersRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  loginUser
);

export default usersRouter;
