import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ collection: 'orders' })
export class Orders {
  @Prop({ type: String, required: true })
  from: string;

  @Prop({ type: String, required: true })
  to: string;

  @Prop({ type: String, required: true })
  login: string;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);

export type OrderLeanDoc = Orders & { _id: Types.ObjectId };
export type OrderDoc = Orders & Document;
