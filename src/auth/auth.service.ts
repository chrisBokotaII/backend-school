import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistrationService } from 'src/registration/registration.service';
import { AccademicService } from 'src/accademic/accademic.service';
import { StudentsService } from 'src/students/students.service';
import { Helper } from 'src/lib/helper';
import { LoginDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly regService: RegistrationService,
    private readonly accdemicService: AccademicService,
    private readonly studentService: StudentsService,
    private readonly jwtService: JwtService,
  ) {}
  async loginReg(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const reg = await this.regService.findOneByEmail(email);
    const comparePass = Helper.comparePassword(password, reg.password);
    if (!comparePass || !reg) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = {
      sub: reg.id,
      role: reg.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      data: reg,
    };
  }

  async loginStudent(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const student = await this.studentService.findOneByEmail(email);
    const comparePass = Helper.comparePassword(password, student.password);
    if (!comparePass || !student) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = {
      sub: student.id,
      role: student.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      data: student,
    };
  }

  async loginAccademic(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const accademic = await this.accdemicService.findOneByEmail(email);
    const comparePass = Helper.comparePassword(password, accademic.password);
    if (!comparePass || !accademic) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = {
      sub: accademic.id,
      role: accademic.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      data: accademic,
    };
  }
}
