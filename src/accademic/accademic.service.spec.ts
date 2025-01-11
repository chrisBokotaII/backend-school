import { Test, TestingModule } from '@nestjs/testing';
import { AccademicService } from './accademic.service';

describe('AccademicService', () => {
  let service: AccademicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccademicService],
    }).compile();

    service = module.get<AccademicService>(AccademicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
