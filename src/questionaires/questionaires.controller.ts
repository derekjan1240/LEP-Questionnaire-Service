import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionairesService } from './questionaires.service';
import { CreateQuestionaireDto } from './dto/create-questionaire.dto';

@Controller('questionaires')
export class QuestionairesController {
  constructor(private readonly questionairesService: QuestionairesService) {}

  @Post()
  create(@Body() createQuestionaireDto: CreateQuestionaireDto) {
    return this.questionairesService.create(createQuestionaireDto);
  }

  @Get()
  findAll() {
    return this.questionairesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionairesService.findOne(+id);
  }
}
