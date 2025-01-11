import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Facalty } from './facalty.entity';
import { ProgramPeriods } from './program-periods.entity';
import { Student } from 'src/students/entities/student.entity';

@Entity()
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  duration: number;
  @Column()
  degree: string;
  @Column()
  code: string;
  @Column()
  description: string;
  @OneToMany(() => ProgramPeriods, (programPeriods) => programPeriods.program)
  programPeriods: ProgramPeriods[];

  @ManyToOne(() => Facalty, (facalty) => facalty.programs)
  faculty: Facalty;

  @OneToMany(() => Student, (student) => student.program)
  students: Student[];
}
