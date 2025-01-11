import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Period } from './period.entity';
import { Program } from './program.entity';
import { Modules } from './modules-c.entity';
import { Student } from 'src/students/entities/student.entity';

@Entity()
export class ProgramPeriods {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Program, (program) => program.programPeriods)
  program: Program;
  @ManyToOne(() => Period, (period) => period.programPeriods)
  period: Period;
  @OneToMany(() => Modules, (module) => module.programPeriods)
  modules: Modules[];
  @OneToMany(() => Student, (student) => student.currentPeriod)
  students: Student[];
}
