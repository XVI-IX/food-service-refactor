import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IOrderRepository } from 'src/domain/repositories/order-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { OrderModel } from 'src/domain/models/order.model';
import { CreateOrderDto, UpdateOrderDto } from '../common/dto';
import { OrderHistoryModel } from 'src/domain/models/orderHistory.model';
import { OrderEventTypeEnum } from '@prisma/client';
import { OrderItemModel } from 'src/domain/models/orderItem.model';
import { envConfig } from '../config/environment.config';

@Injectable()
export class OrderRepository implements IOrderRepository {
  private readonly logger: Logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(OrderRepository.name);
  }

  async createOrder(userId: string, dto: CreateOrderDto): Promise<OrderModel> {
    try {
      const storeExists = await this.prisma.stores.findUnique({
        where: {
          id: dto.storeId,
        },
      });

      if (!storeExists) {
        throw new NotFoundException('Store with id not found');
      }

      const order = await this.prisma.orders.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          store: {
            connect: {
              id: dto.storeId,
            },
          },
          deliveryLocation: dto.deliveryLocation,
          deliveryInstructions: dto.deliveryInstructions,
          subTotalPrice: dto.subTotalPrice,
          paymentMethod: dto.paymentMethod,
        },
      });

      if (!order) {
        throw new BadRequestException('Order could not be placed');
      }

      return order;
    } catch (error) {
      this.logger.error('Order could not be added to DB', error.stack);
      throw error;
    }
  }

  async addOrderHistory(
    orderId: string,
    eventType: OrderEventTypeEnum,
    userId: string,
  ): Promise<OrderHistoryModel> {
    try {
      const orderHistory = await this.prisma.orderHistory.create({
        data: {
          order: {
            connect: {
              id: orderId,
            },
          },
          eventType: eventType,
          actor: {
            connect: {
              id: userId,
            },
          },
        },
      });

      if (!orderHistory) {
        throw new BadRequestException('Order history could not be added');
      }

      return orderHistory;
    } catch (error) {
      this.logger.error('Order history could not be added', error.stack);
      throw error;
    }
  }

  async failedOrder(orderId: string): Promise<OrderModel> {
    try {
      const failedOrder = await this.prisma.orders.update({
        where: {
          id: orderId,
        },
        data: {
          deliveryStatus: 'failed',
        },
      });

      if (!failedOrder) {
        throw new BadRequestException('Failed order could not be recorded');
      }

      await this.addOrderHistory(orderId, 'cancellation', failedOrder.userId);

      return failedOrder;
    } catch (error) {
      this.logger.error('Failed order could not be recorded', error.stack);
      throw error;
    }
  }

  async addOrderItems(
    storeId: string,
    items: OrderItemModel[],
    orderId: string,
  ): Promise<OrderModel> {
    try {
      const orderItems = items.map(async (orderItem) => {
        try {
          const findItem = await this.prisma.items.findUnique({
            where: {
              id: orderItem.id,
              storeId: storeId,
            },
          });

          if (!findItem) {
            throw new BadRequestException('Item could not be found in Store');
          }

          const item = await this.prisma.orderItems.create({
            data: {
              order: {
                connect: {
                  id: orderId,
                },
              },
              item: {
                connect: {
                  id: findItem.id,
                },
              },
              price: findItem.price,
              quantity: orderItem.quantity,
            },
          });

          if (!item) {
            await this.prisma.orders.update({
              where: {
                id: orderId,
              },
              data: {
                deliveryStatus: 'failed',
              },
            });
            throw new BadRequestException('Order item could not be added');
          }
        } catch (error) {
          this.logger.error(error);
          throw error;
        }
      });

      const orderItemsResponse = await Promise.all(orderItems);

      if (!orderItemsResponse) {
        throw new BadRequestException('Order items could not be added');
      }

      const ordersFinal = await this.prisma.orders.findUnique({
        where: {
          id: orderId,
        },
        select: {
          id: true,
          userId: true,
          storeId: true,
          deliveryLocation: true,
          deliveryStatus: true,
          orderReference: true,
          deliveryInstructions: true,
          subTotalPrice: true,
          paymentMethod: true,
          estimatedDeliveryTime: true,
          promoCode: true,
          taxAmount: true,
          deliveryFee: true,
          orderHistory: true,
          orderItems: true,
          transactions: true,
          feedback: true,
          rating: true,
          cancellationReason: true,
          timeslotId: true,
        },
      });

      if (!ordersFinal) {
        throw new BadRequestException('Order could not be retrieved');
      }

      return ordersFinal;
    } catch (error) {
      this.logger.error('Order items could not be added to order', error.stack);
      throw error;
    }
  }

  async getAllOrders(page?: number): Promise<OrderModel[]> {
    try {
      const orders = await this.prisma.orders.findMany({
        skip: (page - 1) * envConfig.getPaginationLimit(),
        take: envConfig.getPaginationLimit(),
      });

      if (!orders) {
        throw new BadRequestException('Orders could not be retrieved');
      }

      return orders;
    } catch (error) {
      this.logger.error('Orders could not be rtrieved', error.stack);
    }
  }

  async getAllUserOrders(userId: string, page?: number): Promise<OrderModel[]> {
    try {
      const userOrders = await this.prisma.orders.findMany({
        where: {
          userId: userId,
        },
        take: envConfig.getPaginationLimit(),
        skip: (page - 1) * envConfig.getPaginationLimit(),
      });

      if (!userOrders) {
        throw new BadRequestException('User orders could not be retrieved');
      }

      return userOrders;
    } catch (error) {
      this.logger.error('User orders could not be retrieved', error.stack);
      throw error;
    }
  }

  async getAllStoreOrders(
    storeId: string,
    page?: number,
  ): Promise<OrderModel[]> {
    try {
      const storeOrders = await this.prisma.orders.findMany({
        where: {
          storeId: storeId,
        },
        skip: (page - 1) * envConfig.getPaginationLimit(),
        take: envConfig.getPaginationLimit(),
      });

      if (!storeOrders) {
        throw new BadRequestException('Store orders could not be retrieved');
      }

      return storeOrders;
    } catch (error) {
      this.logger.error('Store orders could not be retrieved');
      throw error;
    }
  }

  async getOrderById(orderId: string): Promise<OrderModel> {
    try {
      const order = await this.prisma.orders.findUnique({
        where: {
          id: orderId,
        },
        select: {
          id: true,
          userId: true,
          storeId: true,
          deliveryLocation: true,
          deliveryStatus: true,
          orderReference: true,
          deliveryInstructions: true,
          subTotalPrice: true,
          paymentMethod: true,
          estimatedDeliveryTime: true,
          promoCode: true,
          taxAmount: true,
          deliveryFee: true,
          orderHistory: true,
          orderItems: true,
          transactions: true,
          feedback: true,
          rating: true,
          cancellationReason: true,
          timeslotId: true,
        },
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      return order;
    } catch (error) {
      this.logger.error('Order could not be retrieved', error.stack);
      throw error;
    }
  }

  async updateOrder(orderId: string, dto: UpdateOrderDto): Promise<OrderModel> {
    try {
      const updateOrder = await this.prisma.orders.update({
        where: {
          id: orderId,
        },
        data: {
          deliveryLocation: dto.deliveryLocation,
          deliveryStatus: dto.deliveryStatus,
          deliveryInstructions: dto.deliveryInstructions,
          subTotalPrice: dto.subTotalPrice,
          paymentMethod: dto.paymentMethod,
          promoCode: dto.promoCode,
          deliveryFee: dto.deliveryFee,
          timeslotId: dto.timeslotId,
        },
      });

      if (!updateOrder) {
        throw new BadRequestException('Order could not be updated');
      }

      return updateOrder;
    } catch (error) {
      this.logger.error('Order could not be updated', error.stack);
      throw error;
    }
  }

  async confirmOrder(orderId: string): Promise<OrderModel> {
    try {
      const order = await this.prisma.orders.update({
        where: {
          id: orderId,
        },
        data: {
          deliveryStatus: 'confirmed',
        },
        select: {
          user: true,
          id: true,
        },
      });

      if (!order) {
        throw new BadRequestException('Order could not be confirmed');
      }

      return order;
    } catch (error) {
      this.logger.error('Order could not be confirmed', error.stack);
      throw error;
    }
  }

  async cancelOrder(orderId: string): Promise<OrderModel> {
    try {
      const cancelledOrder = await this.prisma.orders.update({
        where: {
          id: orderId,
        },
        data: {
          deliveryStatus: 'cancelled',
        },
      });

      if (!cancelledOrder) {
        throw new BadRequestException('Order could not be cancelled');
      }

      return cancelledOrder;
    } catch (error) {
      this.logger.error('Order could not be cancelled', error.stack);
      throw error;
    }
  }

  async getOrderItems(orderId: string): Promise<OrderItemModel[]> {
    try {
      const orderItems = await this.prisma.orderItems.findMany({
        where: {
          orderId: orderId,
        },
        select: {
          id: true,
          item: true,
          orderId: true,
          itemId: true,
          quantity: true,
          totalItemPrice: true,
          price: true,
        },
      });

      if (!orderItems) {
        throw new BadRequestException('Order items could not be retrieved');
      }

      return orderItems;
    } catch (error) {
      this.logger.error('Order items could be retrieved', error.stack);
      throw error;
    }
  }
}
