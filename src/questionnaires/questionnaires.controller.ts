import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from 'src/app.service';
import { QuestionnairesService } from './questionnaires.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { CreateQuestionnaireResultDto } from './dto/create-questionnaire-result.dto';
import { UpdateQuestionnaireResultDto } from './dto/update-questionnaire-result.dto';

@Controller('questionnaires')
export class QuestionnairesController {
  constructor(
    private readonly questionnairesService: QuestionnairesService,
    private readonly appService: AppService,
  ) {}

  // 新增問卷
  @Post()
  public async createQuestionnaire(
    @Req() req,
    @Body() createQuestionnaireDto: CreateQuestionnaireDto,
  ) {
    const user = await this.appService.validAauthentication(req.headers);
    return this.questionnairesService.createQuestionnaire(
      createQuestionnaireDto,
      user,
    );
  }

  // 指派問卷給班級
  @Post('/assign')
  public async createQuestionnaireResult(
    @Req() req,
    @Body() createQuestionnaireResultDto: CreateQuestionnaireResultDto,
  ) {
    const user = await this.appService.validAauthentication(req.headers);

    if (user.role !== 'Admin') {
      throw new HttpException(`您無權編輯新增問卷!`, HttpStatus.UNAUTHORIZED);
    }

    const classrooms = await this.appService.getClassroomsRelation([
      createQuestionnaireResultDto.classroom,
    ]);

    if (!classrooms.length) {
      throw new HttpException(`班級不存在!`, HttpStatus.BAD_REQUEST);
    }

    if (!classrooms[0].studentList.length) {
      throw new HttpException(`班級學生不存在!`, HttpStatus.BAD_REQUEST);
    }

    // 確保學生都存在 (避免資料庫不一致的問題)
    const studens = await this.appService.getUsersRelation(
      classrooms[0].studentList,
    );

    const dto = studens.map(student => {
      return {
        questionnaire: createQuestionnaireResultDto.questionnaire,
        assigner: user._id,
        assignee: student._id,
        classroom: classrooms[0].id,
      };
    });

    return this.questionnairesService.createQuestionnaireResult(dto, user);
  }

  // 學生作答問卷
  @Put('/result/:id')
  public async updateQuestionnaireResult(
    @Param('id') id: string,
    @Body() updateQuestionnaireDto: UpdateQuestionnaireResultDto,
  ) {
    return this.questionnairesService.updateQuestionnaireResult(
      id,
      updateQuestionnaireDto,
    );
  }

  @Get()
  public async findAllQuestionnaires() {
    return this.questionnairesService.findAllQuestionnaires();
  }

  @Get('/result')
  public async findAllQuestionnaireResults(@Req() req) {
    const user = await this.appService.validAauthentication(req.headers);
    const questionnaireResults = await this.questionnairesService.findAllQuestionnaireResults(
      user,
    );

    const classrooms = await this.appService.getClassroomsRelation(
      questionnaireResults.map(questionnaire => questionnaire.classroom),
    );

    // 關聯 指派人 & 被指派人
    let assignees = [];
    let assigners = [];

    if (user.role !== 'Student') {
      assignees = await this.appService.getUsersRelation(
        questionnaireResults.map(questionnaire => questionnaire.assignee),
      );
    } else {
      assigners = await this.appService.getUsersRelation(
        questionnaireResults.map(questionnaire => questionnaire.assigner),
      );
    }

    return questionnaireResults.map((questionnaireResult, index) => {
      return {
        ...questionnaireResult.toJson(),
        assignee:
          user.role !== 'Student'
            ? assignees.filter(
                assignee => assignee._id === questionnaireResult.assignee,
              )[0]
            : user,
        assigner:
          user.role !== 'Student'
            ? user
            : assigners.filter(
                assigner => assigner._id === questionnaireResult.assigner,
              )[0],
        classroom: classrooms.filter(
          classroom => classroom.id === questionnaireResult.classroom,
        )[0],
      };
    });
  }

  @Get('/result/:id')
  public async findQuestionnaireResult(@Param('id') id: string) {
    return this.questionnairesService.findQuestionnaireResult(id);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.questionnairesService.findOne(id);
  }
}
