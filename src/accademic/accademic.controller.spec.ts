import { Test, TestingModule } from '@nestjs/testing';
import { AccademicController } from './accademic.controller';
import { AccademicService } from './accademic.service';

describe('AccademicController', () => {
  let controller: AccademicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccademicController],
      providers: [AccademicService],
    }).compile();

    controller = module.get<AccademicController>(AccademicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
