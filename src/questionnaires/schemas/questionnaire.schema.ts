import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionnaireDocument = Questionnaire & Document;

@Schema({ timestamps: true })
export class Questionnaire {
  _id: any;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  questions: Object[];

  toJson() {
    return {
      _id: this._id,
      name: this.name,
      description: this.description,
      questions: this.questions,
    };
  }
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);

QuestionnaireSchema.loadClass(Questionnaire);
