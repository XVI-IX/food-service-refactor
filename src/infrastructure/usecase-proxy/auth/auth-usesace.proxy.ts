import { Module } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { UseCaseProxy } from '../usecase-proxy';
import { RegisterUseCase } from 'src/usecases/auth/register.usecase';
import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';
import { ArgonService } from 'src/infrastructure/services/argon/argon.service';
import { JWtTokenModule } from 'src/infrastructure/services/jwt/jwt.module';
import { ArgonModule } from 'src/infrastructure/services/argon/argon.module';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { LoginUseCase } from 'src/usecases/auth/login.usecase';
import { ForgotPasswordUseCase } from 'src/usecases/auth/forgot_password.usecase';
import { ResetPasswordUseCasesProxy } from 'src/usecases/auth/reset_password.usecase';

export const AUTH_USECASE_CONSTANTS = {
  REGISTER: 'REGISTER_USER_USECASE_PROXY',
  LOGIN: 'LOGIN_USER_USECASE_PROXY',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD_USECASE_PROXY',
  RESET_PASSWORD: 'RESET_PASSWORD_USECASE_PROXY',
};

@Module({
  imports: [JWtTokenModule, ArgonModule, RepositoriesModule],
})
export class AuthUseCaseProxyModule {
  static REGISTER_USE_CASES_PROXY = 'RegisterUseCasesProxy';
  static LOGIN_USE_CASES_PROXY = 'LoginUseCasesProxy';
  static FORGOT_PASSWORD_USE_CASES_PROXY = 'ForgotPasswordUseCasesProxy';
  static RESET_PASSWORD_USE_CASES_PROXY = 'ResetPasswordUseCasesProxy';

  static register() {
    return {
      module: AuthUseCaseProxyModule,
      providers: [
        {
          inject: [JwtTokenService, UserRepository, ArgonService],
          provide: AuthUseCaseProxyModule.LOGIN_USE_CASES_PROXY,
          useFactory: (
            jwt: JwtTokenService,
            argon: ArgonService,
            userRepository: UserRepository,
          ) => new UseCaseProxy(new LoginUseCase(userRepository, jwt, argon)),
        },
        {
          inject: [UserRepository, ArgonService],
          provide: AuthUseCaseProxyModule.REGISTER_USE_CASES_PROXY,
          useFactory: (
            jwt: JwtTokenService,
            argon: ArgonService,
            userRepository: UserRepository,
          ) => new UseCaseProxy(new RegisterUseCase(userRepository)),
        },
        {
          inject: [UserRepository, JwtTokenService],
          provide: AuthUseCaseProxyModule.FORGOT_PASSWORD_USE_CASES_PROXY,
          useFactory: (userRepository: UserRepository, jwt: JwtTokenService) =>
            new UseCaseProxy(new ForgotPasswordUseCase(userRepository, jwt)),
        },
        {
          inject: [UserRepository],
          provide: AuthUseCaseProxyModule.RESET_PASSWORD_USE_CASES_PROXY,
          useFactory: (
            userRepository: UserRepository,
            jwt: JwtTokenService,
            argon: ArgonService,
          ) =>
            new UseCaseProxy(
              new ResetPasswordUseCasesProxy(userRepository, argon, jwt),
            ),
        },
      ],
    };
  }
}
