import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Questionnaire,
  QuestionnaireDocument,
} from './schemas/questionnaire.schema';
import {
  QuestionnaireResult,
  QuestionnaireResultDocument,
} from './schemas/questionnaireResult.schema';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { CreateQuestionnaireResultDto } from './dto/create-questionnaire-result.dto';
import { UpdateQuestionnaireResultDto } from './dto/update-questionnaire-result.dto';

@Injectable()
export class QuestionnairesService {
  constructor(
    @InjectModel(Questionnaire.name)
    private questionnaireModel: Model<QuestionnaireDocument>,
    @InjectModel(QuestionnaireResult.name)
    private questionnaireResultModel: Model<QuestionnaireResultDocument>,
  ) {}

  public async createQuestionnaire(
    createQuestionnaireDto: CreateQuestionnaireDto,
  ): Promise<any> {
    try {
      const newQuestionnaire = await this.questionnaireModel.create({
        ...createQuestionnaireDto,
      });
      return newQuestionnaire.toJson();
    } catch (error) {
      throw new HttpException(
        `新增問卷失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async createQuestionnaireResult(dto: CreateQuestionnaireResultDto) {
    return 'This action adds a new questionaire';
  }

  public async updateQuestionnaireResult(dto: UpdateQuestionnaireResultDto) {
    return 'This action adds a new questionaire';
  }

  public async findAll() {
    return `This action returns all questionaires`;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} questionaire`;
  }
}
