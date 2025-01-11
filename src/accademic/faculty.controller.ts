import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyDto } from './dto/faculty-dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from 'src/auth/role/decorator';
import { Role } from 'src/auth/role/enum';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ACCADEMIC)
  create(@Body() facultyDto: FacultyDto) {
    return this.facultyService.create(facultyDto);
  }
  @Get()
  findAll() {
    return this.facultyService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facultyService.findOne(id);
  }
}
