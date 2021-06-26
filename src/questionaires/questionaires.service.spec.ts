import { Test, TestingModule } from '@nestjs/testing';
import { QuestionairesService } from './questionaires.service';

describe('QuestionairesService', () => {
  let service: QuestionairesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionairesService],
    }).compile();

    service = module.get<QuestionairesService>(QuestionairesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
