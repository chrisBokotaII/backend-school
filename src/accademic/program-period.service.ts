import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramPeriods } from './entities/program-periods.entity';
import { ProgramPeriodDto } from './dto/programPeriod.dto';
import { PeriodService } from './period.service';
import { ProgramService } from './program.service';

@Injectable()
export class ProgramPeriodService {
  constructor(
    @InjectRepository(ProgramPeriods)
    private readonly programPeriodsRepository: Repository<ProgramPeriods>,
    private readonly programService: ProgramService,
    private readonly periodService: PeriodService,
  ) {}

  async create(programPeriodDto: ProgramPeriodDto) {
    const program = await this.programService.findOne(
      programPeriodDto.programId,
    );
    const period = await this.periodService.findOne(programPeriodDto.periodId);
    const programPeriod = new ProgramPeriods();
    programPeriod.program = program;
    programPeriod.period = period;
    return this.programPeriodsRepository.save(programPeriod);
  }

  async findAll() {
    return this.programPeriodsRepository.find({
      relations: {
        period: true,
        program: true,
        modules: true,
        students: true,
      },
    });
  }

  async findFirstPeriodByProgramId(programId: string) {
    const programPeriod = await this.programPeriodsRepository.findOne({
      where: { program: { id: programId } },
      relations: {
        period: true,
      },
      order: {
        period: {
          year: 'ASC',
          semester: 'ASC',
        },
      },
    });
    if (!programPeriod) {
      throw new NotFoundException('No periods found for this program');
    }
    return programPeriod;
  }

  async findOne(id: string) {
    return this.programPeriodsRepository.findOne({
      where: { id },
    });
  }
}
