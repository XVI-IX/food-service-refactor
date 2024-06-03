import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { orderItems, orders } from '@prisma/client';
import { ServiceInterface } from 'src/domain/adapters';
import { CreateOrderDto, UpdateOrderDto } from 'src/infrastructure/common/dto';
import { envConfig } from 'src/infrastructure/config/environment.config';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class OrderService {
  private logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(OrderService.name);
  }

  async createOrder(
    userId: string,
    dto: CreateOrderDto,
  ): Promise<ServiceInterface<orders>> {
    try {
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

      const addOrderHistory = await this.prisma.orderHistory.create({
        data: {
          order: {
            connect: {
              id: order.id,
            },
          },
          eventType: 'placement',
          actor: {
            connect: {
              id: userId,
            },
          },
        },
      });

      if (!addOrderHistory) {
        await this.prisma.orders.delete({
          where: {
            id: order.id,
          },
        });
        throw new BadRequestException('Order history could not be recorded');
      }

      const addOrderItems = dto.orderItems.map(async (orderItem) => {
        try {
          const findItem = await this.prisma.items.findUnique({
            where: {
              id: orderItem.id,
              storeId: dto.storeId,
            },
          });

          if (!findItem) {
            throw new BadRequestException('Item could not be found in Store');
          }

          const item = await this.prisma.orderItems.create({
            data: {
              order: {
                connect: {
                  id: order.id,
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
                id: order.id,
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

      await Promise.all(addOrderItems);

      if (!addOrderItems) {
        throw new BadRequestException('Order items could not be added');
      }

      const ordersFinal = await this.prisma.orders.findUnique({
        where: {
          id: order.id,
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

      return {
        data: ordersFinal,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllOrders(page: number = 1): Promise<ServiceInterface<orders[]>> {
    try {
      const orders = await this.prisma.orders.findMany({
        skip: (page - 1) * envConfig.getPaginationLimit(),
        take: envConfig.getPaginationLimit(),
      });

      if (!orders) {
        throw new InternalServerErrorException('Orders could not be retrieved');
      }

      return {
        data: orders,
        page,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllUserOrders(
    userId: string,
    page: number = 1,
  ): Promise<ServiceInterface<orders[]>> {
    try {
      const userOrders = await this.prisma.orders.findMany({
        where: {
          userId: userId,
        },
        take: envConfig.getPaginationLimit(),
        skip: (page - 1) * envConfig.getPaginationLimit(),
      });

      if (!userOrders) {
        throw new InternalServerErrorException(
          'User orders could not be retrieved',
        );
      }

      return {
        data: userOrders,
        page,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllStoreOrders(
    storeId: string,
    page: number = 1,
  ): Promise<ServiceInterface<orders[]>> {
    try {
      const storeOrders = await this.prisma.orders.findMany({
        where: {
          storeId: storeId,
        },
        skip: (page - 1) * envConfig.getPaginationLimit(),
        take: envConfig.getPaginationLimit(),
      });

      if (!storeOrders) {
        throw new InternalServerErrorException(
          'Store orders could not be retrieved',
        );
      }

      return {
        data: storeOrders,
        page,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getOrderItems(
    orderId: string,
  ): Promise<ServiceInterface<orderItems[]>> {
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
        throw new InternalServerErrorException(
          'Order items could not be retrieved',
        );
      }

      return {
        data: orderItems,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getOrderById(orderId: string): Promise<ServiceInterface<orders>> {
    try {
      const order = await this.prisma.orders.findUnique({
        where: {
          id: orderId,
        },
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      return {
        data: order,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateOrder(
    orderId: string,
    dto: UpdateOrderDto,
    userId: string,
  ): Promise<ServiceInterface<orders>> {
    try {
      const orderExists = await this.prisma.orders.findUnique({
        where: {
          id: orderId,
        },
      });

      if (!orderExists) {
        throw new BadRequestException('Order does not exist');
      }

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
        throw new InternalServerErrorException('Order could not be updated');
      }

      const orderHistory = await this.prisma.orderHistory.create({
        data: {
          order: {
            connect: {
              id: orderId,
            },
          },
          eventType: 'modification',
          actor: {
            connect: {
              id: userId,
            },
          },
          details: dto.details,
        },
      });

      if (!orderHistory) {
        this.logger.error('Order history could not be saved');
      }

      return {
        data: updateOrder,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async cancelOrder(
    orderId: string,
    userId: string,
  ): Promise<ServiceInterface<orders>> {
    try {
      const order = await this.prisma.orders.findUnique({
        where: {
          id: orderId,
        },
      });

      if (!order) {
        throw new InternalServerErrorException(
          'Order could not be retrieved for deletion',
        );
      }

      const validCancellationStatus = ['placed', 'confirmed', 'in_progress'];

      if (!validCancellationStatus.includes(order.deliveryStatus)) {
        throw new BadRequestException('Order cannot be cancelled.');
      }

      const cancelledOrder = await this.prisma.orders.update({
        where: {
          id: orderId,
        },
        data: {
          deliveryStatus: 'cancelled',
        },
      });

      if (!cancelledOrder) {
        throw new InternalServerErrorException('Order could not be cancelled');
      }
      // TODO: Check if payment has been charged and reverse bill
      // TODO: Notify user and store that the order has been cancelled

      const orderHistory = await this.prisma.orderHistory.create({
        data: {
          eventType: 'cancellation',
          actor: {
            connect: {
              id: userId,
            },
          },
          order: {
            connect: {
              id: orderId,
            },
          },
        },
      });

      if (!orderHistory) {
        this.logger.error('Order history could not be saved');
      }

      return {
        data: cancelledOrder,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
