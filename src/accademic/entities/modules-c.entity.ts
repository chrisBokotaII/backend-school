import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProgramPeriods } from './program-periods.entity';

@Entity()
export class Modules {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  code: string;
  @Column()
  description: string;
  @ManyToOne(() => ProgramPeriods, (programPeriods) => programPeriods.modules)
  programPeriods: ProgramPeriods;
  @Column()
  credit: number;
}
