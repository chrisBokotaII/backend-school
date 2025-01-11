/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { Repository } from 'typeorm';
import { StudentsService } from 'src/students/students.service';
import { studentDto } from './dto/student-Dto';
import { Generator } from './lib/generator';
import { ProgramService } from 'src/accademic/program.service';
import { Helper } from 'src/lib/helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Registration) private regRepo: Repository<Registration>,
    private readonly studentsService: StudentsService,
    private readonly programService: ProgramService,
    private readonly jwtService: JwtService,
  ) {}
  async create(createRegistrationDto: CreateRegistrationDto) {
    const hash = Helper.hashPassword(createRegistrationDto.password);
    const regOfficer = this.regRepo.create({
      ...createRegistrationDto,
      password: hash,
    });
    const reg = await this.regRepo.save(regOfficer);
    const payload = {
      sub: reg.id,
      role: reg.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      data: reg,
    };
  }

  async findAll() {
    return await this.regRepo.find({ relations: { student: true } });
  }

  findOne(id: string) {
    const regOfficer = this.regRepo.findOne({ where: { id } });
    if (!regOfficer) {
      throw new NotFoundException(`Registration with ID ${id} not found`);
    }

    return regOfficer;
  }

  // update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
  //   return `This action updates a #${id} registration`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} registration`;
  // }
  async findOneByEmail(email: string) {
    const regOfficer = await this.regRepo.findOne({ where: { email } });
    if (!regOfficer) {
      throw new NotFoundException(`Registration with email ${email} not found`);
    }

    return regOfficer;
  }

  async registerStudent(studentDto: studentDto, regOfficerId: string) {
    const passwordGen = Generator.generatepassword();
    const password = Helper.hashPassword(passwordGen);
    const studentEmail = Generator.generateEmailandId(studentDto.name);
    const program = await this.programService.findOne(studentDto.program);
    const regOfficer = await this.regRepo.findOne({
      where: { id: regOfficerId },
    });
    console.log(regOfficer);
    if (!regOfficer) {
      throw new NotFoundException(
        `Registration Officer with ID ${regOfficerId} not found`,
      );
    }
    const student = await this.studentsService.create({
      ...studentDto,
      password,
      studentEmail: studentEmail.email,
      studentId: studentEmail.id,
      program,
      registration: regOfficer,
    });
    return { student, password: passwordGen };
  }
}
