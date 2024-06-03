import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceInterface } from 'src/domain/adapters';
import { ICustomerService } from 'src/domain/adapters/customer.interface';
import { UpdateCustomerDto } from 'src/infrastructure/common/dto';
import { envConfig } from 'src/infrastructure/config/environment.config';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class CustomerService implements ICustomerService {
  private logger: Logger;
  constructor(
    private readonly prisma: PrismaService,
    private readonly emitter: EventEmitter2,
  ) {
    this.logger = new Logger(CustomerService.name);
  }

  private PAGINATION_LIMIT = envConfig.getPaginationLimit();

  /**
   * Get the list of all customers present on the site
   *
   * @param page Present page number for pagination
   * @returns {Promise<ServiceInterface>}
   */
  async getAllCustomers(page: number = 1): Promise<ServiceInterface> {
    try {
      const customers = await this.prisma.users.findMany({
        where: {
          role: 'customer',
        },
        skip: (page - 1) * this.PAGINATION_LIMIT,
        take: this.PAGINATION_LIMIT,
        select: {
          id: true,
          firstName: true,
          otherName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          businessAddress: true,
          createdAt: true,
          updatedAt: true,
          status: true,
        },
      });

      if (!customers) {
        throw new InternalServerErrorException(
          'Customers could not be retrieved',
        );
      }

      return {
        data: customers,
        page,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Gets a particular user's profile.
   *
   * @param customerId ID of customer to be retrieved
   * @returns {Promise<ServiceInterface>}
   */
  async getCustomerById(customerId: string): Promise<ServiceInterface> {
    try {
      const customer = await this.prisma.users.findUnique({
        where: {
          id: customerId,
        },
        select: {
          id: true,
          firstName: true,
          otherName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          businessAddress: true,
          createdAt: true,
          updatedAt: true,
          status: true,
        },
      });

      if (!customer) {
        throw new NotFoundException('Customer with ID not found');
      }

      return { data: customer };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Update the customer's data with data provided in dto.
   *
   * @param customerId Unique ID representing customers' data in database
   * @param dto Data to update customer data with.
   * @returns {Promise<ServiceInterface>}
   */
  async updateCustomer(
    customerId: string,
    dto: UpdateCustomerDto,
  ): Promise<ServiceInterface> {
    try {
      const customerExists = await this.prisma.users.findUnique({
        where: {
          id: customerId,
          role: 'customer',
        },
      });

      if (!customerExists) {
        throw new NotFoundException('Customer could not be found');
      }

      const updatedCustomer = await this.prisma.users.update({
        where: {
          id: customerId,
        },
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          otherName: dto.otherName,
          phone: dto.phone,
        },
        select: {
          firstName: true,
          lastName: true,
          otherName: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!updatedCustomer) {
        throw new InternalServerErrorException(
          'Customer data could not be updated',
        );
      }

      return { data: updatedCustomer };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Deletes a customer's data from the database
   *
   * @param customerId Unique ID representing customers' data in database
   * @returns {Promise<ServiceInterface>}
   */
  async deleteCustomer(customerId: string): Promise<ServiceInterface> {
    try {
      const customerExists = await this.prisma.users.findUnique({
        where: {
          id: customerId,
        },
      });

      if (!customerExists) {
        throw new NotFoundException('Customer could not be found');
      }

      const deletedCustomer = await this.prisma.users.delete({
        where: {
          id: customerId,
        },
      });

      return {
        data: deletedCustomer,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
