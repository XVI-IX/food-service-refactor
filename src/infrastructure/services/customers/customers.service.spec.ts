import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customers.service';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { PrismaMockFactory } from 'src/infrastructure/prisma/prisma.mock.service';
import { UpdateCustomerDto } from 'src/infrastructure/common/dto';

const userDto: UpdateCustomerDto = {};

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        CustomerService,
        {
          provide: 'PrismaService',
          useFactory: PrismaMockFactory,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all customers', async () => {
    const customers = await service.getAllCustomers();
    expect(customers).toBeDefined();
  });

  it('should get a customer', async () => {
    const customer = await service.getCustomerById(1);
    expect(customer).toBeDefined();
  });

  it("should update a customer's data", async () => {
    const customer = await service.updateCustomer(1, userDto);
    expect(customer).toBeDefined();
  });

  it("should delete a customer's data", async () => {
    const customer = await service.deleteCustomer(1);
    expect(customer).toBeDefined();
  });
});
