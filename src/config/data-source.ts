import { DataSource } from 'typeorm';
// import { User } from '../entities/User.entity';
// import { Credential } from '../entities/Credential.entity';
// import { Appointment } from '../entities/Appointment.entity';
// import { Contact } from '../entities/Contact.entity';
import { config } from './envs';
import {
  ContactSubscriber,
  ForgotPassSubscriber,
  UserSubscriber,
} from '../subscribers';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: Number(config.dbPort),
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbDatabase,
  ssl: true,
  synchronize: true,
  dropSchema: true,
  logging: true,
  // logging: ['error'],
  //entities: [__dirname + './../**/*.entity.{js,ts}'],
  // entities: [Credential, User, Appointment, Contact],
  entities: ['dist/**/*.entity{.ts,.js}'],
  subscribers: [UserSubscriber, ForgotPassSubscriber, ContactSubscriber],
  migrations: [],
});
