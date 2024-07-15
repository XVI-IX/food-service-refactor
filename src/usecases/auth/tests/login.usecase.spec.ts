import { LoginUseCase } from '../login.usecase';

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

const jwtServiceMock = {
  generateToken: jest.fn().mockReturnValue(mockData.token),
};

const userRepositoryMock = {
  getUserByEmail: jest.fn().mockImplementation((email: string) => {
    if (email === mockData.user.email) {
      return {
        id: mockData.user.id,
        email: mockData.user.email,
        password: mockData.user.password,
      };
    }
    return null;
  }),
};

const argonServiceMock = {
  verify: jest.fn().mockImplementation((hash: string, password: string) => {
    return (
      password === mockData.user.password &&
      hash === mockData.user.hashedPassword
    );
  }),
};

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;

  beforeEach(() => {
    loginUseCase = new LoginUseCase(
      userRepositoryMock as any,
      jwtServiceMock as any,
      argonServiceMock as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
