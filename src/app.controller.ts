import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { QuestionnairesService } from './questionnaires/questionnaires.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly questionnairesService: QuestionnairesService,
  ) {}

  @MessagePattern('QUESTIONNAIRE_get_questionnaire_result')
  async getQuestionnaireResult(questionnaire: string): Promise<any> {
    try {
      return await this.questionnairesService.findQuestionnaireResult(
        questionnaire,
      );
    } catch (error) {
      return {};
    }
  }

  @Get()
  test(): string {
    return '[Questionnaire Service] : OK!';
  }
}
