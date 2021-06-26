import { Module } from '@nestjs/common';
import { QuestionairesService } from './questionaires.service';
import { QuestionairesController } from './questionaires.controller';

@Module({
  controllers: [QuestionairesController],
  providers: [QuestionairesService]
})
export class QuestionairesModule {}
