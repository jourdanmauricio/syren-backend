import { Request, Response } from 'express';
import { Appointment } from '../../entities/Appointment';
import { AppointmentService } from '../../services/appointmentsService';
import { catchAsync } from '../../utils/catchAsync';

const appointmentService = AppointmentService.getInstance();

export const scheduleAppointment = catchAsync(
  async (req: Request, res: Response) => {
    const { date, time, userId, status } = req.body;

    if (!userId) res.status(401).json({ message: 'Unathorized' });

    const newAppointment: Appointment = await appointmentService.schedule({
      date,
      time,
      userId,
      status,
    });

    res.status(201).json(newAppointment);
  }
);
