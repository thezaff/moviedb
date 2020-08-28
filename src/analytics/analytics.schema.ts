import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Analytics extends Document {
  @Prop()
  _id: number;

  @Prop()
  seriesName: string;

  @Prop()
  accessCount: number;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
