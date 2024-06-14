import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  IEmail,
  IOrderService,
  ITimeslotEvent,
  ServiceInterface,
} from 'src/domain/adapters';
import { CreateOrderDto, UpdateOrderDto } from '../../common/dto';
import { envConfig } from '../../config/environment.config';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderRepository } from '../../repositories/orders.repository';

@Injectable()
export class OrderService implements IOrderService {
  private logger: Logger;

  constructor(
    private readonly prisma: PrismaService,
    private readonly ordersRepository: OrderRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.logger = new Logger(OrderService.name);
  }

  async createOrder(
    userId: string,
    dto: CreateOrderDto,
  ): Promise<ServiceInterface> {
    try {
      const storeExists = await this.prisma.stores.findUnique({
        where: {
          id: dto.storeId,
        },
      });

      if (!storeExists) {
        throw new NotFoundException('Store with id not found');
      }

      const order = await this.ordersRepository.createOrder(userId, dto);

      const addOrderHistory = await this.ordersRepository.addOrderHistory(
        order.id,
        'placement',
        userId,
      );

      if (!addOrderHistory) {
        await this.ordersRepository.failedOrder(order.id);
        throw new BadRequestException('Order history could not be recorded');
      }

      const orderItems = this.ordersRepository.addOrderItems(
        dto.storeId,
        dto.orderItems,
        order.id,
      );

      return {
        data: orderItems,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllOrders(page: number = 1): Promise<ServiceInterface> {
    try {
      const orders = await this.ordersRepository.getAllOrders(page);

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
  ): Promise<ServiceInterface> {
    try {
      const userOrders = await this.ordersRepository.getAllUserOrders(
        userId,
        page,
      );

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
  ): Promise<ServiceInterface> {
    try {
      const storeOrders = await this.ordersRepository.getAllStoreOrders(
        storeId,
        page,
      );

      return {
        data: storeOrders,
        page,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // TODO: IOrderItems
  async getOrderItems(orderId: string): Promise<ServiceInterface> {
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

  async getOrderById(orderId: string): Promise<ServiceInterface> {
    try {
      const order = await this.ordersRepository.getOrderById(orderId);

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
  ): Promise<ServiceInterface> {
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

  async confirmOrder(orderId: string): Promise<ServiceInterface> {
    try {
      const orderExists = await this.prisma.orders.findUnique({
        where: {
          id: orderId,
          deliveryStatus: {
            notIn: ['cancelled', 'failed'],
          },
        },
      });

      if (!orderExists) {
        throw new BadRequestException('Order could not be retrieved');
      }

      const confirmOrder = await this.prisma.orders.update({
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

      if (!confirmOrder) {
        throw new BadRequestException('Order could not be confirmed');
      }

      const emailData: IEmail = {
        to: confirmOrder.user.email,
        data: {
          userName: confirmOrder.user.userName,
          orderId: confirmOrder.id,
        },
      };
      this.eventEmitter.emit('order.confirmed.email', emailData);

      const eventData: ITimeslotEvent = {
        orderId: confirmOrder.id,
      };
      this.eventEmitter.emit('order.confirmed.event', eventData);

      return {
        data: confirmOrder,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async cancelOrder(
    orderId: string,
    userId: string,
  ): Promise<ServiceInterface> {
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
