import boom from '@hapi/boom';
import { AppDataSource } from '../config/data-source';
import { Appointment } from '../entities/Appointment';

const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
  findById: async function (id: number): Promise<Appointment> {
    const appointment = await this.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    if (!appointment) throw boom.notFound('Appointment not found');
    return appointment;
  },
});

export default AppointmentRepository;
