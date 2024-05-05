import { Request, Response } from 'express';
import { Appointment } from '../../entities/Appointment';

import { AppointmentService } from '../../services/appointmentsService';
import { catchAsync } from '../../utils/catchAsync';

const appointmentService = AppointmentService.getInstance();

export const getAllAppointments = catchAsync(
  async (req: Request, res: Response) => {
    const appointments: Appointment[] = await appointmentService.getAll();
    res.status(200).json(appointments);
  }
);
