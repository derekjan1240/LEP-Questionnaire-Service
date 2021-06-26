import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { QuestionnairesService } from './questionnaires.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { CreateQuestionnaireResultDto } from './dto/create-questionnaire-result.dto';
import { UpdateQuestionnaireResultDto } from './dto/update-questionnaire-result.dto';

@Controller('questionnaires')
export class QuestionnairesController {
  constructor(private readonly questionnairesService: QuestionnairesService) {}

  // 新增問卷
  @Post()
  createQuestionnaire(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnairesService.createQuestionnaire(
      createQuestionnaireDto,
    );
  }

  // 指派問卷給班級
  @Post('/assign')
  createQuestionnaireResult(
    @Body() createQuestionnaireDto: CreateQuestionnaireResultDto,
  ) {
    return this.questionnairesService.createQuestionnaireResult(
      createQuestionnaireDto,
    );
  }

  // 學生作答問卷
  @Put('/result')
  updateQuestionnaireResult(
    @Body() createQuestionnaireDto: UpdateQuestionnaireResultDto,
  ) {
    return this.questionnairesService.updateQuestionnaireResult(
      createQuestionnaireDto,
    );
  }

  @Get()
  findAll() {
    return this.questionnairesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionnairesService.findOne(+id);
  }
}
