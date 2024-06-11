import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customers.service';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { PrismaMockFactory } from 'src/infrastructure/prisma/prisma.mock.service';
import { UpdateCustomerDto } from 'src/infrastructure/common/dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

const userDto: UpdateCustomerDto = {
  email: 'testemail@example.com',
  password: 'testPassword',
  role: 'customer',
  userName: 'testUser',
  firstName: 'test first name',
  phone: '0000000000',
};

const customerId = 'customerid';

describe('CustomerService', () => {
  let service: CustomerService;
  let prisma;

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
    prisma = module.get('PrismaService');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all customers', async () => {
    const mockCustomers = { data: [] };
    prisma.user.findMany.mockResolvedValue(mockCustomers);

    const customers = await service.getAllCustomers();
    expect(customers).toEqual(mockCustomers);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  it('should get a customer', async () => {
    const customer = await service.getCustomerById(customerId);
    expect(customer).toBeDefined();
  });

  it("should update a customer's data", async () => {
    const customer = await service.updateCustomer(customerId, userDto);
    expect(customer).toBeDefined();
  });

  it("should delete a customer's data", async () => {
    const customer = await service.deleteCustomer(customerId);
    expect(customer).toBeDefined();
  });
});
