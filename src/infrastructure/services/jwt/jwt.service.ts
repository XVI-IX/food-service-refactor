import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload, IJwtService } from 'src/domain/adapters/jwt.interface';
import { envConfig } from 'src/infrastructure/config/environment.config';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: IJwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: envConfig.getJWTSecret(),
      expiresIn: envConfig.getJwtExpiration(),
    });
  }

  generateResetToken(payload: IJwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: envConfig.getResetSecret(),
      expiresIn: envConfig.getJwtExpiration(),
    });
  }

  async verifyToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token, {
      secret: envConfig.getJWTSecret(),
    });
  }

  async verifyResetToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token, {
      secret: envConfig.getResetSecret(),
    });
  }
}
