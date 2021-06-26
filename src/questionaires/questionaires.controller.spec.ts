import { Test, TestingModule } from '@nestjs/testing';
import { QuestionairesController } from './questionaires.controller';
import { QuestionairesService } from './questionaires.service';

describe('QuestionairesController', () => {
  let controller: QuestionairesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionairesController],
      providers: [QuestionairesService],
    }).compile();

    controller = module.get<QuestionairesController>(QuestionairesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
