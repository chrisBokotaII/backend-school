import { PartialType } from '@nestjs/mapped-types';
import { CreateAccademicDto } from './create-accademic.dto';

export class UpdateAccademicDto extends PartialType(CreateAccademicDto) {}
