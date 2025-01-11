import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramDto } from './dto/program-Dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from 'src/auth/role/decorator';
import { Role } from 'src/auth/role/enum';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ACCADEMIC)
  create(@Body() programdto: ProgramDto) {
    return this.programService.create(programdto);
  }
  @Get()
  findAll() {
    return this.programService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programService.findOne(id);
  }
}
