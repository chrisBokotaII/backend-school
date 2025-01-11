import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { studentDto } from './dto/student-Dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/role/decorator';
import { Role } from 'src/auth/role/enum';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
// import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationService.create(createRegistrationDto);
  }
  @Post('student')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.REG)
  async createStudent(@Body() Studendto: studentDto, @Request() req) {
    try {
      return await this.registrationService.registerStudent(
        Studendto,
        req.user.sub,
      );
    } catch (error) {
      throw new BadRequestException('Failed to register student.');
    }
  }

  @Get()
  findAll() {
    return this.registrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRegistrationDto: UpdateRegistrationDto) {
  //   return this.registrationService.update(+id, updateRegistrationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.registrationService.remove(+id);
  // }
}
