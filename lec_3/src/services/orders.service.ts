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

  async createOrder(body: OrderDto) {}
}
