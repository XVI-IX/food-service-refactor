import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { orderItems, orders } from '@prisma/client';
import { ServiceInterface } from 'src/domain/adapters';
import { UpdateOrderDto } from 'src/infrastructure/common/dto';
import { envConfig } from 'src/infrastructure/config/environment.config';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class OrderService {
  private logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(OrderService.name);
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
    userId: number,
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
    storeId: number,
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
    orderId: number,
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

  async getOrderById(orderId: number): Promise<ServiceInterface<orders>> {
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
    orderId: number,
    dto: UpdateOrderDto,
    userId: number,
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
    orderId: number,
    userId: number,
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
