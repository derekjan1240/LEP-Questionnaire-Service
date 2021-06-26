import { Injectable } from '@nestjs/common';
import { CreateQuestionaireDto } from './dto/create-questionaire.dto';

@Injectable()
export class QuestionairesService {
  create(createQuestionaireDto: CreateQuestionaireDto) {
    return 'This action adds a new questionaire';
  }

  findAll() {
    return `This action returns all questionaires`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionaire`;
  }
}
