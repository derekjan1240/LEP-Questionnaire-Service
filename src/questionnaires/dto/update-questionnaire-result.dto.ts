import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class UpdateQuestionnaireResultDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: '問卷題目答案不得為空' })
  answers: Object[];
}
