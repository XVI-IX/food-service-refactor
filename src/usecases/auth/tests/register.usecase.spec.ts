import { BadRequestException } from '@nestjs/common';
import { RegisterUseCase } from '../register.usecase';

const mockData = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjhmYjFhOWUyN2RiNmY4NTJkMjkxZGIiLCJlbWFpbCI6Im9sYWRvamExNEBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsInVzZXJOYW1lIjoiRGF2aWQtRGFuaWVsIE9qZWJpeWkiLCJpYXQiOjE3MjEwNDAwMjAsImV4cCI6MTcyNjIyNDAyMH0.1XubvtLO3F5G-gNx98xLWsporV_J232cvw9yyIxuzco',
  user: {
    id: '749ce9f4-9419-4b58-b04b-395f6cde75ee',
    userName: 'charliebrown',
    firstName: 'Charlie',
    otherName: 'David',
    lastName: 'Brown',
    phone: '+44444444',
    email: 'charlie.unitas@example.com',
    password: 'supersafepassword202',
    hashedPassword: 'hashedPassword',
    role: 'customer',
    verificationToken: '202021',
    businessAddress: '9101 Birch Lane, Central City, TX',
    latitude: '29.760427',
    longitude: '-95.369804',
  },
};

const userRepositoryMock = {
  getUserByEmail: jest.fn().mockReturnValue(null),
  createUser: jest.fn().mockImplementation((user) => ({
    ...user,
    id: mockData.user.id,
  })),
};

const argonServiceMock = {
  hash: jest.fn().mockReturnValue(mockData.user.hashedPassword),
};

describe('RegisterUseCase', () => {
  let registerUsecase: RegisterUseCase;

  beforeEach(() => {
    registerUsecase = new RegisterUseCase(
      userRepositoryMock as any,
      argonServiceMock as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user', async () => {
    const registerInput = {
      email: mockData.user.email,
      userName: mockData.user.userName,
      phone: mockData.user.phone,
      role: mockData.user.role,
      verificationToken: mockData.user.verificationToken,
      password: mockData.user.password,
      firstName: mockData.user.firstName,
      lastName: mockData.user.lastName,
    };
    const user = await registerUsecase.register(registerInput);
    expect(user).toBe(mockData.user);
    expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(
      mockData.user.email,
    );
    expect(argonServiceMock.hash).toHaveBeenCalledWith(mockData.user.password);
  });

  it('should throw BadRequestException if user already exists', async () => {
    userRepositoryMock.getUserByEmail.mockReturnValueOnce({});
    const registerInput = {
      email: mockData.user.email,
      userName: mockData.user.userName,
      phone: mockData.user.phone,
      role: mockData.user.role,
      verificationToken: mockData.user.verificationToken,
      password: mockData.user.password,
      firstName: mockData.user.firstName,
      lastName: mockData.user.lastName,
    };
    await expect(registerUsecase.register(registerInput)).rejects.toThrow(
      BadRequestException,
    );
    expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(
      mockData.user.email,
    );
    expect(argonServiceMock.hash).not.toHaveBeenCalled();
  });
});
