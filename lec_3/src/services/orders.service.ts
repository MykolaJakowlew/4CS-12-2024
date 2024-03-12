import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { OrderDoc, Orders } from '../schema';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDto } from '../models/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders.name)
    private readonly orderModel: Model<OrderDoc>,
  ) {}

  async createOrder(body: OrderDto & { login: string }) {
    const price = Math.floor(Math.random() * (50 - 10 + 1) + 10);

    const doc = new this.orderModel({ ...body, price });

    const order = await doc.save();

    return order;
  }
}
