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
import { UserDto } from 'src/user.dto';

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
    user: UserDto,
  ): Promise<any> {
    try {
      if (user.role !== 'Admin') {
        throw new HttpException(`您無權編輯新增問卷!`, HttpStatus.UNAUTHORIZED);
      }
      const newQuestionnaire = await this.questionnaireModel.create(
        createQuestionnaireDto,
      );
      return newQuestionnaire.toJson();
    } catch (error) {
      throw new HttpException(
        `新增問卷失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async createQuestionnaireResult(dto: Object, user: UserDto) {
    try {
      const newQuestionnaireResults = await this.questionnaireResultModel.insertMany(
        dto,
      );
      return newQuestionnaireResults;
    } catch (error) {
      throw new HttpException(
        `指派問卷失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateQuestionnaireResult(
    id: string,
    updateQuestionnaireResultDto: UpdateQuestionnaireResultDto,
  ) {
    try {
      const questionnaireResult = await this.questionnaireResultModel.findById(
        id,
      );

      if (!questionnaireResult) {
        throw new HttpException(`問卷不存在!`, HttpStatus.NOT_FOUND);
      }

      if (questionnaireResult.is_complated) {
        throw new HttpException(`問卷已完成不得修改!`, HttpStatus.NOT_FOUND);
      }

      const updatedQuestionnaireResult = await this.questionnaireResultModel.findByIdAndUpdate(
        id,
        {
          ...updateQuestionnaireResultDto,
          is_complated: true,
          complated_date: new Date(),
        },
        { new: true },
      );
      return updatedQuestionnaireResult.toJson();
    } catch (error) {
      throw new HttpException(
        `儲存問卷失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAllQuestionnaires() {
    try {
      const allQuestionnaires = await this.questionnaireModel
        .find()
        .sort({ createdAt: -1 });
      return allQuestionnaires.map(questionnaire => questionnaire.toJson());
    } catch (error) {
      throw new HttpException(
        `查詢問卷失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAllQuestionnaireResults(user: UserDto) {
    try {
      const query =
        user.role === 'Student'
          ? {
              assignee: user._id,
            }
          : {
              assigner: user._id,
            };
      return this.questionnaireResultModel
        .find(query)
        .populate('questionnaire')
        .sort({ createdAt: -1 });
    } catch (error) {
      throw new HttpException(
        `查詢指派問卷失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findQuestionnaireResult(id: string) {
    try {
      const questionnaireResult = await this.questionnaireResultModel
        .findById(id)
        .populate('questionnaire');
      return questionnaireResult.toJson();
    } catch (error) {
      throw new HttpException(
        `查詢問卷失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findOne(id: string) {
    try {
      const questionnaire = await this.questionnaireModel.findById(id);
      return questionnaire.toJson();
    } catch (error) {
      throw new HttpException(
        `查詢問卷失敗!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
