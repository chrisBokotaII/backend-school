import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccademicDto } from './dto/create-accademic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accademic } from './entities/accademic.entity';
import { Repository } from 'typeorm';
import { Helper } from 'src/lib/helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccademicService {
  constructor(
    @InjectRepository(Accademic) private accademicRepo: Repository<Accademic>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createAccademicDto: CreateAccademicDto) {
    const hash = Helper.hashPassword(createAccademicDto.password);
    const accademic = this.accademicRepo.create({
      ...createAccademicDto,
      password: hash,
    });
    await this.accademicRepo.save(accademic);
    const payload = {
      sub: accademic.id,
      role: accademic.role,
    };
    const token = this.jwtService.sign(payload);
    return { accademic, token };
  }

  findAll() {
    return this.accademicRepo.find();
  }

  async findOne(id: string) {
    const accademic = await this.accademicRepo.findOne({ where: { id } });
    if (!accademic) {
      throw new NotFoundException(`Accademic with ID ${id} not found`);
    }
    return accademic;
  }

  async findOneByEmail(email: string) {
    const accademic = await this.accademicRepo.findOne({ where: { email } });
    if (!accademic) {
      throw new NotFoundException(`Accademic with email ${email} not found`);
    }
    return accademic;
  }

  async remove(id: string) {
    const accademic = await this.findOne(id);
    return this.accademicRepo.remove(accademic);
  }
}
