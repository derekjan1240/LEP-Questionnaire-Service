import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionaireDocument = Questionaire & Document;

@Schema({ timestamps: true })
export class Questionaire {
  _id: any;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  toJson() {
    return {
      _id: this._id,
      name: this.name,
      unit: this.description,
    };
  }
}

export const QuestionaireSchema = SchemaFactory.createForClass(Questionaire);

QuestionaireSchema.loadClass(Questionaire);
