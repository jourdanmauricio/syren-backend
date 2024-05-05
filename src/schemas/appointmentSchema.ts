import Joi from 'joi';
import { TAppointmentStatus } from '../entities/Appointment';

const id = Joi.number();
const date = Joi.date().greater('now');
const time = Joi.string();
const status = Joi.string()
  .default(TAppointmentStatus.ACTIVE)
  .valid(TAppointmentStatus.ACTIVE, TAppointmentStatus.CANCELLED);
const userId = Joi.number();

const createAppointmentSchema = Joi.object({
  date: date.required(),
  time: time.required(),
  status,
  userId: userId.required(),
});

// Solo premite modificar el estado. No se permite reagendar turnos
const updateAppointmentSchema = Joi.object({
  status,
});

const getAppointmentSchema = Joi.object({
  id: id.required(),
});

export {
  createAppointmentSchema,
  updateAppointmentSchema,
  getAppointmentSchema,
};
