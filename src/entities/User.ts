import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Credential } from './Credential';
import { Appointment } from './Appointment';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 150,
  })
  name: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  birthdate: Date;

  @Column()
  nDni: number;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @OneToOne(() => Credential)
  @JoinColumn()
  credential: Credential;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
