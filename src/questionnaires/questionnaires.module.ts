import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from 'src/app.module';
import { QuestionnairesService } from './questionnaires.service';
import { QuestionnairesController } from './questionnaires.controller';
import {
  Questionnaire,
  QuestionnaireSchema,
} from './schemas/questionnaire.schema';

import {
  QuestionnaireResult,
  QuestionnaireResultSchema,
} from './schemas/questionnaireResult.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Questionnaire.name, schema: QuestionnaireSchema },
      { name: QuestionnaireResult.name, schema: QuestionnaireResultSchema },
    ]),
    forwardRef(() => AppModule),
  ],
  controllers: [QuestionnairesController],
  providers: [QuestionnairesService],
})
export class QuestionnairesModule {}
