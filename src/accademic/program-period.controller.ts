import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProgramPeriodDto } from './dto/programPeriod.dto';
import { ProgramPeriodService } from './program-period.service';

@Controller('program-period')
export class ProgramPeriodController {
  constructor(private readonly programPeriodService: ProgramPeriodService) {}

  @Post()
  create(@Body() programPeriodDto: ProgramPeriodDto) {
    return this.programPeriodService.create(programPeriodDto);
  }

  @Get()
  findAll() {
    return this.programPeriodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programPeriodService.findOne(id);
  }
}
