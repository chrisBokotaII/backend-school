import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { StudentsModule } from 'src/students/students.module';
import { AccademicModule } from 'src/accademic/accademic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Registration]),
    StudentsModule,
    AccademicModule,
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService, StudentsModule, AccademicModule],
})
export class RegistrationModule {}
