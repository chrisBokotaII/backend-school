import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constant';
import { RegistrationModule } from 'src/registration/registration.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
      global: true,
    }),
    RegistrationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
