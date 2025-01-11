import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationModule } from './registration/registration.module';
import { StudentsModule } from './students/students.module';
import { AccademicModule } from './accademic/accademic.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: process.env.ENV === 'dev' ? true : false,
      logger: 'advanced-console',
      logging: 'all',
    }),
    RegistrationModule,
    StudentsModule,
    AccademicModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
