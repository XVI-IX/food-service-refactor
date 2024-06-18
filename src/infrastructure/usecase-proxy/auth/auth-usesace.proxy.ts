import { Inject } from '@nestjs/common';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { UseCaseProxy } from '../usecase-proxy';
import { RegisterUseCase } from 'src/usecases/auth/register.usecase';
import { JwtService } from '@nestjs/jwt';

export const AUTH_USECASE_CONSTANTS = {
  REGISTER: 'REGISTER_USER_USECASE_PROXY',
  LOGIN: 'LOGIN_USER_USECASE_PROXY',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD_USECASE_PROXY',
  RESET_PASSWORD: 'RESET_PASSWORD_USECASE_PROXY',
};

export const REGISTER_USER_USE_CASE_PROXY = {
  Inject: [UserRepository, LoggerService],
  provide: AUTH_USECASE_CONSTANTS.REGISTER,
  useFactory: (userRepository: UserRepository) =>
    new UseCaseProxy(new RegisterUseCase(userRepository)),
};

export const LOGIN_USER_USECASE_PROXY = {
  inject: [UserRepository, JwtService],
  provide: AUTH_USECASE_CONSTANTS.LOGIN,
  useFactory: (userRepository: UserRepository, jwt: JwtService) =>
    new UseCaseProxy(),
};
