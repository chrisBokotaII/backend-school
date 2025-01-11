import { Module } from '@nestjs/common';
import { AccademicService } from './accademic.service';
import { AccademicController } from './accademic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accademic } from './entities/accademic.entity';
import { Program } from './entities/program.entity';
import { ProgramPeriods } from './entities/program-periods.entity';
import { Period } from './entities/period.entity';
import { Modules } from './entities/modules-c.entity';
import { Facalty } from './entities/facalty.entity';
import { FacultyService } from './faculty.service';
import { ProgramService } from './program.service';
import { FacultyController } from './faculty.controller';
import { ProgramController } from './program.controller';
import { PeriodController } from './period.controller';
import { PeriodService } from './period.service';
import { ProgramPeriodController } from './program-period.controller';
import { ProgramPeriodService } from './program-period.service';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Accademic,
      Program,
      ProgramPeriods,
      Period,
      Modules,
      Facalty,
    ]),
  ],
  controllers: [
    AccademicController,
    FacultyController,
    ProgramController,
    PeriodController,
    ProgramPeriodController,
    ModuleController,
  ],
  providers: [
    AccademicService,
    FacultyService,
    ProgramService,
    PeriodService,
    ProgramPeriodService,
    ModuleService,
  ],
  exports: [
    AccademicService,
    FacultyService,
    ProgramService,
    ProgramPeriodService,
  ],
})
export class AccademicModule {}
