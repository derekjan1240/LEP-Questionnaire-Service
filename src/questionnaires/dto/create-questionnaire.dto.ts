import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateQuestionnaireDto {
  @ApiProperty({ required: true })
  @IsString({ message: '問卷名稱型態錯誤' })
  @IsNotEmpty({ message: '問卷名稱不得為空' })
  name: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString({ message: '問卷說明型態錯誤' })
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: '問卷題目不得為空' })
  questions: Object[];
}
