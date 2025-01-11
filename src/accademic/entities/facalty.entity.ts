import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Program } from './program.entity';

@Entity()
export class Facalty {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => Program, (program) => program.faculty)
  programs: Program[];
}
