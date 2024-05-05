import { TAppointmentStatus } from '../entities/Appointment';

interface IAppointmentDto {
  date: string;
  time: string;
  userId: number;
  status: TAppointmentStatus;
}

export default IAppointmentDto;
