import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from 'src/auth/role/decorator';
import { Role } from 'src/auth/role/enum';
import { ModuleDto } from './dto/module.dto';
import { ModuleService } from './module.service';

@Controller('modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ACCADEMIC)
  create(@Body() moduleDto: ModuleDto) {
    return this.moduleService.create(moduleDto);
  }
  @Get()
  findAll() {
    return this.moduleService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(id);
  }
}
