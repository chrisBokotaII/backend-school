import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccademicService } from './accademic.service';
import { CreateAccademicDto } from './dto/create-accademic.dto';
// import { CreateAccademicDto } from './dto/create-accademic.dto';
// import { UpdateAccademicDto } from './dto/update-accademic.dto';

@Controller('accademic')
export class AccademicController {
  constructor(private readonly accademicService: AccademicService) {}

  @Post()
  create(@Body() createAccademicDto: CreateAccademicDto) {
    return this.accademicService.create(createAccademicDto);
  }

  @Get()
  findAll() {
    return this.accademicService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.accademicService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAccademicDto: UpdateAccademicDto) {
  //   return this.accademicService.update(+id, updateAccademicDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accademicService.remove(+id);
  // }
}
