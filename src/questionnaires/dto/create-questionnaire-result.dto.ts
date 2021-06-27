import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
export class CreateQuestionnaireResultDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: '問卷不得為空' })
  questionnaire: ObjectId;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: '所屬班級不得為空' })
  @IsString({ message: '所屬班級型態錯誤' })
  classroom: string;
}
