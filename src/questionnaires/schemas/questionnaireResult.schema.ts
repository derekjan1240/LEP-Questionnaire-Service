import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type QuestionnaireResultDocument = QuestionnaireResult & Document;

@Schema({ timestamps: true })
export class QuestionnaireResult {
  _id: any;
  createdAt: any;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Questionnaire',
    required: true,
  })
  questionnaire: Types.ObjectId;

  @Prop({ type: String, required: true })
  assigner: string;

  @Prop({ type: String, required: true })
  assignee: string;

  @Prop({ type: String, required: true })
  classroom: string;

  @Prop({ type: Object, required: false })
  answers: any;

  @Prop({ type: Boolean, required: false, default: false })
  is_complated: boolean;

  @Prop({ type: Date, required: false, default: null })
  complated_date: Date;

  toJson() {
    return {
      _id: this._id,
      questionnaire: this.questionnaire,
      assigner: this.assigner,
      assignee: this.assignee,
      classroom: this.classroom,
      answers: this.answers,
      is_complated: this.is_complated,
      complated_date: this.complated_date,
      createdAt: this.createdAt,
    };
  }
}

export const QuestionnaireResultSchema = SchemaFactory.createForClass(
  QuestionnaireResult,
);

QuestionnaireResultSchema.loadClass(QuestionnaireResult);
