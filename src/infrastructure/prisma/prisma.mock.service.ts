import { UpdateCustomerDto } from '../common/dto';

export const customerId = '97bc1be7-9f92-48f0-83c0-f2d25b235827';

export const userDto: UpdateCustomerDto = {
  email: 'testemail@example.com',
  password: 'testPassword',
  role: 'customer',
  userName: 'testUser',
  firstName: 'test first name',
  phone: '0000000000',
};
export const PrismaMockFactory = () => ({
  users: {
    create: jest.fn().mockResolvedValue({ id: customerId, ...userDto }),
    findMany: jest.fn().mockResolvedValue({ data: [] }),
    findUnique: jest.fn().mockResolvedValue({ id: customerId, ...userDto }),
    update: jest.fn().mockResolvedValue({ id: customerId, ...userDto }),
    delete: jest.fn().mockResolvedValue({ id: customerId, ...userDto }),
  },
});
