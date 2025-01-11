import { Program } from 'src/accademic/entities/program.entity';
import { Registration } from 'src/registration/entities/registration.entity';

export class CreateStudentDto {
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  password: string;
  studentId: string;
  studentEmail: string;
  program: Program;
  gender: string;
  registration: Registration;
}
