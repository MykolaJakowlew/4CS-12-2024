import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrderDto } from '../models/order.dto';
import { UserLeanDoc } from '../schema';
import { OrdersService } from '../services/orders.service';

@Controller({ path: '/orders' })
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/')
  async createOrder(
    @Body() body: OrderDto,
    @Req() req: Request & { user?: UserLeanDoc },
  ) {
    const order = await this.ordersService.createOrder({
      ...body,
      login: req.user.login,
    });

    return order;
  }
}
