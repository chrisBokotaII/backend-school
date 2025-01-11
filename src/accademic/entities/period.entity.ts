import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ProgramPeriods } from './program-periods.entity';

@Entity()
@Unique(['year', 'semester'])
export class Period {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  year: number;
  @Column()
  semester: number;
  @OneToMany(() => ProgramPeriods, (programPeriods) => programPeriods.period)
  programPeriods: ProgramPeriods[];
}
