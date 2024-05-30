import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { GetAuthUser, IAuthUser } from 'src/infrastructure/common/decorators';
import { UpdateOrderDto } from 'src/infrastructure/common/dto';
import { HttpResponse } from 'src/infrastructure/common/helpers/response.helper';
import { OrderService } from 'src/infrastructure/services/orders/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Get()
  async getAllOrders(@Query('page') page: number) {
    const response = await this.ordersService.getAllOrders(page);
    return HttpResponse.send('Orders retrieved', response);
  }

  @Get('/userOrders/:userId')
  async getAllUserOrders(
    @Param('userId') userId: string,
    @Query('page') page: number,
  ) {
    const response = await this.ordersService.getAllUserOrders(userId, page);
    return HttpResponse.send('User orders retrieved', response);
  }

  @Get('/storeOrders/:storeId')
  async getAllStoreOrders(
    @Param('storeId') storeId: string,
    @Query('page') page: number,
  ) {
    const response = await this.ordersService.getAllStoreOrders(storeId, page);
    return HttpResponse.send('Store orders retrieved', response);
  }

  @Get('/:orderId/items')
  async getOrderItems(@Param('orderId') orderId: string) {
    const response = await this.ordersService.getOrderItems(orderId);
    return HttpResponse.send('Order items retrieved', response);
  }

  @Get('/:orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    const response = await this.ordersService.getOrderById(orderId);
    return HttpResponse.send('Order retrieved', response);
  }

  @Put('/:orderId')
  async updateOrderById(
    @Param('orderId') orderId: string,
    @Body() dto: UpdateOrderDto,
    @GetAuthUser() user: IAuthUser,
  ) {
    const response = await this.ordersService.updateOrder(
      orderId,
      dto,
      user.id,
    );
    return HttpResponse.send('Order updated.', response);
  }

  @Put('/:orderId/cancel')
  async cancelOrder(
    @Param('orderId') orderId: string,
    @GetAuthUser() user: IAuthUser,
  ) {
    const response = await this.ordersService.cancelOrder(orderId, user.id);
    return HttpResponse.send('Order cancelled', response);
  }
}