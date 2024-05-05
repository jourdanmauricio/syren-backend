import { TAppointmentStatus } from '../entities/Appointment.entity';

interface IAppointmentDto {
  date: string;
  time: string;
  userId: number;
  status: TAppointmentStatus;
}

export default IAppointmentDto;
