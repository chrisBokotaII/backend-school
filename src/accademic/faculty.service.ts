import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Facalty } from './entities/facalty.entity';
import { Repository } from 'typeorm';
import { FacultyDto } from './dto/faculty-dto';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(Facalty) private facultyRepo: Repository<Facalty>,
  ) {}
  create(facultydto: FacultyDto) {
    const faculty = this.facultyRepo.create(facultydto);

    return this.facultyRepo.save(faculty);
  }

  async findAll() {
    return await this.facultyRepo.find({
      relations: {
        programs: true,
      },
    });
  }

  findOne(id: string) {
    const faculty = this.facultyRepo.findOne({ where: { id } });
    if (!faculty) {
      throw new NotFoundException(`Faculty with ID ${id} not found`);
    }

    return faculty;
  }

  //   update(id: number, updateAccademicDto: UpdateAccademicDto) {
  //     return `This action updates a #${id} accademic`;
  //   }

  //   remove(id: number) {
  //     return `This action removes a #${id} accademic`;
  //   }
}
