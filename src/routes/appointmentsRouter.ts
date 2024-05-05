import { Router } from 'express';
import passport from 'passport';
import {
  getAllAppointments,
  getAppointment,
  scheduleAppointment,
  cancelAppointment,
} from '../controllers';

import {
  createAppointmentSchema,
  updateAppointmentSchema,
  getAppointmentSchema,
} from '../schemas/appointmentSchema';

import { isAdmin, checkRoles } from './../middlewares/auth';
import validatorHandler from '../middlewares/validatorHandler';
import { TUserRole } from '../entities/Credential';

const appointmentsRouter: Router = Router();

appointmentsRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  getAllAppointments
);
appointmentsRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(false, TUserRole.ADMIN, TUserRole.USER),
  validatorHandler(getAppointmentSchema, 'params'),
  getAppointment
);
appointmentsRouter.post(
  '/schedule',
  passport.authenticate('jwt', { session: false }),
  checkRoles(true, TUserRole.ADMIN, TUserRole.USER),
  validatorHandler(createAppointmentSchema, 'body'),
  scheduleAppointment
);
appointmentsRouter.put(
  '/cancel/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getAppointmentSchema, 'params'),
  validatorHandler(updateAppointmentSchema, 'body'),
  checkRoles(false, TUserRole.ADMIN, TUserRole.USER),
  cancelAppointment
);

export default appointmentsRouter;
