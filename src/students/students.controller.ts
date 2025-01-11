import {
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from 'src/auth/role/decorator';
import { Role } from 'src/auth/role/enum';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('profile')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.STUDENT)
  getProfile(@Request() req) {
    return this.studentsService.findOne(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id/period/:periodId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.REG)
  updatePeriod(@Param('id') id: string, @Param('periodId') periodId: string) {
    return this.studentsService.updateStudentPeriod(id, periodId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
  //   return this.studentsService.update(+id, updateStudentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.studentsService.remove(+id);
  // }
}
