import { Program } from 'src/accademic/entities/program.entity';
import { Registration } from 'src/registration/entities/registration.entity';
import { ProgramPeriods } from 'src/accademic/entities/program-periods.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  dob: string;
  @Column()
  studentId: string;
  @Column()
  studentEmail: string;
  @Column({ enum: ['male', 'female'] })
  gender: string;
  @Column()
  address: string;
  @Column()
  password: string;
  @Column({ default: 'student', enum: ['student'] })
  role: 'student';
  @ManyToOne(() => Program, (program) => program.students)
  program: Program;
  @ManyToOne(() => ProgramPeriods, (programPeriod) => programPeriod.students)
  currentPeriod: ProgramPeriods;
  @ManyToOne(() => Registration, (registration) => registration.student)
  registration: Registration;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
