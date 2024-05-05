import { Request, Response } from 'express';

import { AppointmentService } from '../../services/appointmentsService';
import { catchAsync } from '../../utils/catchAsync';

const appointmentService = AppointmentService.getInstance();

export const getAppointment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const appointment = await appointmentService.getAppointment(Number(id));
    res.status(200).json(appointment);
  }
);
