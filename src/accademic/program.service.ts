import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { Repository } from 'typeorm';
import { FacultyService } from './faculty.service';
import { ProgramDto } from './dto/program-Dto';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program) private programRepo: Repository<Program>,
    private readonly facultyService: FacultyService,
  ) {}
  async create(programdto: ProgramDto) {
    const faculty = await this.facultyService.findOne(programdto.facultyId);
    const program = new Program();
    program.name = programdto.name;
    program.faculty = faculty;
    program.code = programdto.code;
    program.description = programdto.description;
    program.duration = programdto.duration;
    program.degree = programdto.degree;

    return this.programRepo.save(program);
  }

  async findAll() {
    return await this.programRepo.find();
  }

  async findOne(id: string) {
    const program = await this.programRepo.findOne({ where: { id } });
    return program;
  }

  //   update(id: number, updateAccademicDto: UpdateAccademicDto) {
  //     return `This action updates a #${id} accademic`;
  //   }

  //   remove(id: number) {
  //     return `This action removes a #${id} accademic`;
  //   }
}
