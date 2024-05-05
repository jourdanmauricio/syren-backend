export enum TAppointmentStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User.entity';

@Entity({
  name: 'appointments',
})
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column({
    type: 'enum',
    enum: TAppointmentStatus,
    default: TAppointmentStatus.ACTIVE,
  })
  status: TAppointmentStatus;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
