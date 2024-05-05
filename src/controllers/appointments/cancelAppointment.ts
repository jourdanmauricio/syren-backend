import { Request, Response } from 'express';
import { AppointmentService } from '../../services/appointmentsService';
import { catchAsync } from '../../utils/catchAsync';
import { Credential } from '../../entities/Credential';

const appointmentService = AppointmentService.getInstance();

export const cancelAppointment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    // verificamos que el id a cancelar pertenezca al usuario
    // utilizando el payload del token
    const user = <Credential>req.user;

    const updAppointment = await appointmentService.cancel(Number(id), user);
    res
      .status(200)
      .json({ message: `Canceled appointment id: ${updAppointment.id}` });
  }
);
