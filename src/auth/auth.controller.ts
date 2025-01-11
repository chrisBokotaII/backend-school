import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/reg')
  loginReg(@Body() loginDto: LoginDto) {
    return this.authService.loginReg(loginDto);
  }
  @Post('login/student')
  loginStudent(@Body() loginDto: LoginDto) {
    return this.authService.loginStudent(loginDto);
  }
  @Post('login/accademic')
  loginAccademic(@Body() loginDto: LoginDto) {
    return this.authService.loginAccademic(loginDto);
  }
}
