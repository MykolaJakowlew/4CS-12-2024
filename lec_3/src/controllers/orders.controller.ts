import { Body, Controller, Post } from '@nestjs/common';

@Controller({ path: '/orders' })
export class OrdersController {
  @Post('/')
  async createOrder(@Body() body: OrderDto) {}
}
