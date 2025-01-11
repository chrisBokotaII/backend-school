import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { ProgramPeriodService } from 'src/accademic/program-period.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    private readonly programPeriodService: ProgramPeriodService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    // First, get the initial period for the student's program
    const initialPeriod =
      await this.programPeriodService.findFirstPeriodByProgramId(
        createStudentDto.program.id,
      );

    if (!initialPeriod) {
      throw new NotFoundException('No periods found for this program');
    }
    console.log(initialPeriod);

    // Create the new student with the initial period
    const student = this.studentRepo.create({
      ...createStudentDto,
      currentPeriod: initialPeriod,
    });
    console.log(student);

    return this.studentRepo.save(student);
  }

  findAll() {
    return this.studentRepo.find({
      relations: {
        program: {
          faculty: true,
          programPeriods: {
            period: true,
            modules: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: {
        program: true,
        currentPeriod: true,
      },
    });
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }
  async findOneByEmail(email: string) {
    const student = await this.studentRepo.findOne({
      where: { studentEmail: email },
    });
    if (!student) {
      throw new NotFoundException(`Student with email ${email} not found`);
    }
    return student;
  }

  // update(id: number, updateStudentDto: UpdateStudentDto) {
  //   return `This action updates a #${id} student`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} student`;
  // }

  async updateStudentPeriod(studentId: string, periodId: string) {
    const student = await this.studentRepo.findOne({
      where: { id: studentId },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    const newPeriod = await this.programPeriodService.findOne(periodId);

    if (!newPeriod) {
      throw new Error('Period not found');
    }

    student.currentPeriod = newPeriod;
    return this.studentRepo.save(student);
  }
}
