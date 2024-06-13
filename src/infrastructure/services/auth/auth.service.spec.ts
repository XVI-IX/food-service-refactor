import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../prisma/prisma.module';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaMockFactory } from '../../prisma/prisma.mock.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/infrastructure/common/dto';
import { emit } from 'process';
import * as argon from 'argon2';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, EventEmitterModule.forRoot(), JwtModule],
      providers: [
        AuthService,
        // {
        //   provide: PrismaService,
        //   useFactory: PrismaMockFactory,
        // },
        // {
        //   provide: EventEmitter2,
        //   useValue: {
        //     emit: jest.fn(),
        //   },
        // },
        // {
        //   provide: JwtService,
        //   useValue: {

        //   }
        // }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(
      PrismaService,
    ) as jest.Mocked<PrismaService>;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: 'testPassword',
        role: 'customer',
        userName: 'testUser',
        firstName: 'test first name',
        phone: '0000000000',
        otherName: 'test other name',
        businessAddress: 'test business address',
        google_id: 'test google id',
      };

      prisma.users.findUnique = jest.fn().mockResolvedValue(null);
      prisma.users.create = jest.fn().mockResolvedValue({
        ...dto,
        id: 'user-id',
        password: await argon.hash(dto.password),
        verificationToken: 'verificationToken',
      });

      const user = await service.register(dto);
      expect(user).toBeDefined();
      expect(user.data.email).toBe(dto.email);
    });
  });

  it('service should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should throw BadRequestException if email already exists', async () => {
    const dto = {
      userName: 'testuser',
      phone: '1234567890',
      firstName: 'Test',
      otherName: 'User',
      lastName: 'Test',
      email: 'test@example.com',
      password: 'password',
      google_id: 'google_id',
      role: 'user',
    };

    prisma.users.findUnique = jest.fn().mockResolvedValue({ id: 'user-id' }); // Mock email found

    await expect(service.register(dto)).rejects.toThrow(BadRequestException);
  });
});
