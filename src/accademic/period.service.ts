import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Period } from './entities/period.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PeriodDto } from './dto/period-dto';

@Injectable()
export class PeriodService {
  constructor(
    @InjectRepository(Period) private readonly periodRepo: Repository<Period>,
  ) {}

  async create(periodDto: PeriodDto) {
    const period = this.periodRepo.create(periodDto);
    return this.periodRepo.save(period);
  }

  async findAll() {
    return this.periodRepo.find();
  }

  async findOne(id: string) {
    return this.periodRepo.findOne({ where: { id } });
  }
}
