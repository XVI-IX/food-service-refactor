import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ICustomerRepository } from '../../domain/repositories/customer-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { envConfig } from '../config/environment.config';
import { UserModel } from 'src/domain/models/user.model';
import { UpdateCustomerDto } from '../common/dto';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  private logger: Logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(CustomerRepository.name);
  }

  async getAllCustomers(page: number = 1): Promise<UserModel[]> {
    try {
      const customers = await this.prisma.users.findMany({
        where: {
          role: 'customer',
        },
        skip: (page - 1) * envConfig.getPaginationLimit(),
        take: envConfig.getPaginationLimit(),
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

      // console.log(customers)

      return customers;
    } catch (error) {
      this.logger.error('Error retrieving all customers', error.stack);
      throw new BadRequestException('all customers could not be retrieved');
    }
  }

  async getCustomerById(customerId: string): Promise<UserModel> {
    try {
      const customer = await this.prisma.users.findUnique({
        where: {
          id: customerId,
        },
      });

      return customer;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateCustomer(
    customerId: string,
    dto: UpdateCustomerDto,
  ): Promise<UserModel> {
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

      const customer = await this.prisma.users.update({
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
          id: true,
          firstName: true,
          lastName: true,
          otherName: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return customer;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async deleteCustomer(customerId: string): Promise<UserModel> {
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

      return deletedCustomer;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
