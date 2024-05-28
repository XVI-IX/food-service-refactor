import { Body, Controller, Post, Query } from '@nestjs/common';
import {
  CreateUserDto,
  LoginUserDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from 'src/infrastructure/common/dto';
import { HttpResponse } from 'src/infrastructure/common/helpers/response.helper';
import { AuthService } from 'src/infrastructure/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() dto: CreateUserDto) {
    const response = await this.authService.register(dto);
    return HttpResponse.send('User registered successfully', response);
  }

  @Post('authenticate')
  async authenticate(@Body() dto: LoginUserDto) {
    const response = await this.authService.authenticate(dto);
    return HttpResponse.send('User authenticated', response);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const response = await this.authService.forgotPassword(email);
    return HttpResponse.send('Reset toke has been sent', response);
  }

  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body() dto: ResetPasswordDto,
  ) {
    const response = await this.authService.resetPassword(token, dto);
    return HttpResponse.send('Password Reset Successfully', response);
  }

  @Post('verify-email')
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    const response = await this.authService.verifyEmail(dto);
    return HttpResponse.send('Email verified', response);
  }
}
