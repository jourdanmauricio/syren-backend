import boom from '@hapi/boom';
import { AppDataSource } from '../config/data-source';
import IAppointmentDto from '../dto/AppointmentsDto';
import { Appointment, TAppointmentStatus } from '../entities/Appointment';
import { Credential, TUserRole } from '../entities/Credential';
import AppointmentRepository from '../repositories/AppoinmentRepository';
import { UsersService } from './usersService';

const usersService = UsersService.getInstance();

export class AppointmentService {
  static instance: AppointmentService | null = null;

  private constructor() {}

  static getInstance() {
    if (AppointmentService.instance === null) {
      AppointmentService.instance = new AppointmentService();
    }
    return AppointmentService.instance;
  }

  async schedule(appointmentData: IAppointmentDto): Promise<Appointment> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      queryRunner.startTransaction();

      const newAppointment = AppointmentRepository.create(appointmentData);
      await queryRunner.manager.save(newAppointment);

      const user = await usersService.getUser(appointmentData.userId);

      // if (user) No verifico user porque la validación se encuentra en getUser
      newAppointment.user = user;
      await queryRunner.manager.save(newAppointment);

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return newAppointment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async getAll(): Promise<Appointment[]> {
    const appointments = await AppointmentRepository.find({
      relations: {
        user: true,
      },
    });
    return appointments;
  }

  async getAppointment(id: number): Promise<Appointment> {
    const appointment = await AppointmentRepository.findById(id);
    return appointment;
  }

  async cancel(id: number, user: Credential): Promise<Appointment> {
    const appointment = await AppointmentRepository.findById(id);

    // Verificamos que el appointment pertenece al user
    if (user.role !== TUserRole.ADMIN) {
      if (appointment.user.id !== user.id)
        throw boom.forbidden('No autorizado');
    }

    appointment.status = TAppointmentStatus.CANCELLED;
    await AppointmentRepository.save(appointment);
    return appointment;
  }
}
