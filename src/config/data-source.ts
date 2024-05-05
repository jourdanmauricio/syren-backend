import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Credential } from '../entities/Credential';
import { Appointment } from '../entities/Appointment';
import { config } from './envs';
import {
  ContactSubscriber,
  ForgotPassSubscriber,
  UserSubscriber,
} from '../subscribers';
import { Contact } from '../entities/Contact';

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
  entities: [Credential, User, Appointment, Contact],
  subscribers: [UserSubscriber, ForgotPassSubscriber, ContactSubscriber],
  migrations: [],
});
