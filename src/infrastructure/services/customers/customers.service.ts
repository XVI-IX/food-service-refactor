import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceInterface } from '../../../domain/adapters';
import { ICustomerService } from '../../../domain/adapters/customer.interface';
import { UpdateCustomerDto } from '../../common/dto';
import { envConfig } from '../../config/environment.config';
// import { PrismaService } from '../../prisma/prisma.service';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';

@Injectable()
export class CustomerService implements ICustomerService {
  private logger: Logger;
  constructor(
    private readonly customerRepository: CustomerRepository,
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
      const customers = await this.customerRepository.getAllCustomers(page);

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
      const customer =
        await this.customerRepository.getCustomerById(customerId);

      if (!customer) {
        throw new NotFoundException('Customer not found');
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
      const updatedCustomer = await this.customerRepository.updateCustomer(
        customerId,
        dto,
      );

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
      const deletedCustomer =
        await this.customerRepository.deleteCustomer(customerId);

      return {
        data: deletedCustomer,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
