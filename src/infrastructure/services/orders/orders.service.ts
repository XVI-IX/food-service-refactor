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
import { OrderRepository } from '../../repositories/orders.repository';

@Injectable()
export class OrderService implements IOrderService {
  private logger: Logger;

  constructor(
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
      const orderItems = await this.ordersRepository.getOrderItems(orderId);

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
      const orderExists = await this.ordersRepository.getOrderById(orderId);

      if (!orderExists) {
        throw new NotFoundException('Order does not exist');
      }

      const updatedOrder = await this.ordersRepository.updateOrder(
        orderId,
        dto,
      );

      const orderHistory = await this.ordersRepository.addOrderHistory(
        orderId,
        'modification',
        userId,
      );

      if (!orderHistory) {
        this.logger.error('Order history could not be saved');
      }

      return {
        data: updatedOrder,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async confirmOrder(orderId: string): Promise<ServiceInterface> {
    try {
      const orderExists = await this.ordersRepository.getOrderById(orderId);

      if (
        !orderExists.deliveryStatus.includes('cancellation') ||
        !orderExists.deliveryStatus.includes('failed')
      ) {
        throw new BadRequestException('Order has been cancelled or failed');
      }

      const confirmOrder = await this.ordersRepository.confirmOrder(orderId);

      await this.ordersRepository.addOrderHistory(
        orderId,
        'confirmation',
        confirmOrder.user.id,
      );

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
      const order = await this.ordersRepository.getOrderById(orderId);

      if (!order) {
        throw new InternalServerErrorException(
          'Order could not be retrieved for deletion',
        );
      }

      const validCancellationStatus = ['placed', 'confirmed', 'in_progress'];

      if (!validCancellationStatus.includes(order.deliveryStatus)) {
        throw new BadRequestException('Order cannot be cancelled.');
      }

      const cancelledOrder = await this.ordersRepository.cancelOrder(orderId);
      // TODO: Check if payment has been charged and reverse bill
      // TODO: Notify user and store that the order has been cancelled

      const orderHistory = await this.ordersRepository.addOrderHistory(
        orderId,
        'cancellation',
        userId,
      );

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
