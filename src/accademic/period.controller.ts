import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from 'src/auth/role/decorator';
import { Role } from 'src/auth/role/enum';
import { PeriodDto } from './dto/period-dto';
import { PeriodService } from './period.service';

@Controller('period')
export class PeriodController {
  constructor(private readonly periodService: PeriodService) {}
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ACCADEMIC)
  create(@Body() periodDto: PeriodDto) {
    return this.periodService.create(periodDto);
  }
  @Get()
  findAll() {
    return this.periodService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodService.findOne(id);
  }
}
