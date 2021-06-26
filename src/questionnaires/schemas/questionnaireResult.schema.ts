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
  questionaire: Types.ObjectId;

  @Prop({ type: String, required: true })
  assigner: string;

  @Prop({ type: String, required: true })
  assignee: string;

  @Prop({ type: String, required: true })
  classroom: string;

  @Prop({ type: Object, required: false })
  answer: any;

  @Prop({ type: Boolean, required: false, default: false })
  is_complated: boolean;

  @Prop({ type: Date, required: false, default: null })
  complated_date: Date;

  toJson() {
    return {
      _id: this._id,
      assigner: this.assigner,
      assignee: this.assignee,
      classroom: this.classroom,
      answer: this.answer,
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
