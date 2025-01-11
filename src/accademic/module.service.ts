import { Injectable, NotFoundException } from '@nestjs/common';
import { Modules } from './entities/modules-c.entity';
import { Repository } from 'typeorm';
import { ModuleDto } from './dto/module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramPeriodService } from './program-period.service';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Modules)
    private readonly moduleRepository: Repository<Modules>,
    private readonly programPeriodService: ProgramPeriodService,
  ) {}

  async create(moduleDto: ModuleDto) {
    const programPeriod = await this.programPeriodService.findOne(
      moduleDto.programPeriods,
    );
    if (!programPeriod) {
      throw new NotFoundException('Program period not found');
    }
    const module = new Modules();
    module.name = moduleDto.name;
    module.code = moduleDto.code;
    module.description = moduleDto.description;
    module.credit = moduleDto.credit;
    module.programPeriods = programPeriod;
    return this.moduleRepository.save(module);
  }

  async findAll() {
    return this.moduleRepository.find({
      relations: {
        programPeriods: true,
      },
    });
  }
  async findOne(id: string) {
    return this.moduleRepository.findOne({
      where: { id },
      relations: {
        programPeriods: true,
      },
    });
  }
}
