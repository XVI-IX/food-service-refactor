import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customers.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UpdateCustomerDto } from '../../common/dto';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';
import {
  customerId,
  PrismaMockFactory,
  userDto,
} from '../../prisma/prisma.mock.service';

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
