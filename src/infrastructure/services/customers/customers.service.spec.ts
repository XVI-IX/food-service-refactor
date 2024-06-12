import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customers.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UpdateCustomerDto } from '../../common/dto';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const customerId = '97bc1be7-9f92-48f0-83c0-f2d25b235827';
const userDto: UpdateCustomerDto = {
  email: 'testemail@example.com',
  password: 'testPassword',
  role: 'customer',
  userName: 'testUser',
  firstName: 'test first name',
  phone: '0000000000',
};

const PrismaMockFactory = () => ({
  users: {
    create: jest
      .fn()
      .mockResolvedValue({ id: customerId, ...userDto  }),
    findMany: jest.fn().mockResolvedValue({ data: [] }),
    findUnique: jest
      .fn()
      .mockResolvedValue({ id: customerId, ...userDto  }),
    update: jest
      .fn()
      .mockResolvedValue({ id: customerId, ...userDto  }),
    delete: jest
      .fn()
      .mockResolvedValue({ id: customerId, ...userDto  }),
  },
});

// const customerId = uuidv4();
describe('CustomerService', () => {
  let service: CustomerService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, EventEmitterModule.forRoot()],
      providers: [
        CustomerService,
        {
          provide: PrismaService,
          useFactory: PrismaMockFactory,
        },
        EventEmitter2,
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    prisma = module.get<PrismaService>(
      PrismaService,
    ) as jest.Mocked<PrismaService>;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all customers', async () => {
    const customers = await service.getAllCustomers();
    expect(customers).toBeTruthy();
  });

  it('should get a customer', async () => {
    const customer = await service.getCustomerById(customerId);
    expect(customer).toBeDefined();
    expect(customer.data.id).toEqual(customerId);
  });

  it("should update a customer's data", async () => {
    const customer = await service.updateCustomer(customerId, userDto);
    expect(customer).toBeDefined();
    expect(customer.data.id).toEqual(customerId);
    expect(customer.data.email).toEqual(userDto.email);
  });

  it("should delete a customer's data", async () => {
    const customer = await service.deleteCustomer(customerId);
    expect(customer).toBeDefined();
    expect(customer.data.id).toEqual(customerId);
  });

});
