import { AppDataSource } from '../config/data-source';
import { TUserRole } from '../entities/Credential';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';
import AppointmentRepository from '../repositories/AppoinmentRepository';
import CredentialRepository from '../repositories/CredentialRepository';
import UserRepository from '../repositories/UserRepository';

const usersData = [
  {
    name: 'Mauricio Jourdán',
    email: 'jourdanmauricio@gmail.com',
    birthdate: new Date('1974-10-20'),
    nDni: 99999999,
    username: 'jourdanmau',
    password: '12345678',
    role: TUserRole.ADMIN,
  },
  {
    name: 'Paola Jourdán',
    email: 'pao@mail.com',
    birthdate: new Date('2000-01-16'),
    nDni: 99999998,
    username: 'jourdanpao',
    password: '12345678',
    role: TUserRole.USER,
  },
  {
    name: 'Nancy Jourdán',
    email: 'nan@mail.com',
    birthdate: new Date('2001-05-22'),
    nDni: 99999997,
    username: 'jourdannan',
    password: '12345678',
    role: TUserRole.USER,
  },
];

const appointmentsData = [
  {
    date: new Date('2024-03-28'),
    time: '15',
    userId: 2,
  },
  {
    date: new Date('2024-03-15'),
    time: '10:30',
    userId: 3,
  },
];

export const PreloadUsers = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityMananager) => {
      const credentials = await CredentialRepository.find();
      if (credentials.length > 0) return;

      for await (const user of usersData) {
        const { username, password, role, name, email, birthdate, nDni } = user;

        const hashPass = await bcrypt.hash(password, 10);
        const credential = CredentialRepository.create({
          username,
          password: hashPass,
          role,
        });

        const newCredential =
          await transactionalEntityMananager.save(credential);

        const newUser: User = await UserRepository.create({
          name,
          email,
          birthdate,
          nDni,
          credential: newCredential,
        });
        await transactionalEntityMananager.save(newUser);
      }
      console.log('PreloadData Users -> success');
    }
  );
};

export const PreloadAppointments = async () => {
  const appointments = await AppointmentRepository.find();
  if (appointments.length > 0) return;

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  const promises = appointmentsData.map(async (appoinment) => {
    const newAppointment = await AppointmentRepository.create(appoinment);
    await queryRunner.manager.save(newAppointment);

    const user = await UserRepository.findOneBy({ id: appoinment.userId });
    if (!user) throw Error('User not found');
    newAppointment.user = user;
    await queryRunner.manager.save(newAppointment);
  });

  await queryRunner.startTransaction();
  try {
    await Promise.all(promises);
    await queryRunner.commitTransaction();
    console.log('PreloadAppointments -> success');
  } catch (error) {
    console.log('PreloadAppointments -> error');
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};
