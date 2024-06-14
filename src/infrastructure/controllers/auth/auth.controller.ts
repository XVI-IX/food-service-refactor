import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { Public } from '../../common/decorators';
import {
  CreateUserDto,
  LoginUserDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from '../../common/dto';
import { HttpResponse } from '../../common/helpers/response.helper';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  async register(@Body() dto: CreateUserDto) {
    const response = await this.authService.register(dto);
    return HttpResponse.send('User registered successfully', response);
  }

  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  @Public()
  async authenticate(@Body() dto: LoginUserDto) {
    const response = await this.authService.authenticate(dto);
    return HttpResponse.send(response.message, response);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @Public()
  async forgotPassword(@Body('email') email: string) {
    const response = await this.authService.forgotPassword(email);
    return HttpResponse.send('Reset token has been sent', response);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @Public()
  async resetPassword(
    @Query('token') token: string,
    @Body() dto: ResetPasswordDto,
  ) {
    const response = await this.authService.resetPassword(token, dto);
    return HttpResponse.send('Password Reset Successfully', response);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @Public()
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    const response = await this.authService.verifyEmail(dto);
    return HttpResponse.send('Email verified', response);
  }
}
