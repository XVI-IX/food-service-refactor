import * as env from 'env-var';
import { config } from 'dotenv';
import { IEnvironmentInterface } from 'src/domain/config/environment.interface';

config();

class EnvironmentConfig implements IEnvironmentInterface {
  getEnvironment(): string {
    return 'production';
  }

  getPort(): number {
    return env.get('PORT').asInt() || 3000;
  }

  getJWTSecret(): string {
    return env.get('JWT_SECRET').asString();
  }

  getURL(): string {
    return env.get('URL').asString();
  }

  getJwtExpiration(): string {
    return env.get('JWT_EXPIRATION').asString();
  }

  getResetSecret(): string {
    return env.get('RESET_SECRET').asString();
  }

  getEmailHost(): string {
    return env.get('EMAIL_HOST').asString();
  }

  getAdminMail(): string {
    return env.get('ADMIN_MAIL').asString();
  }

  getEmailPassword(): string {
    return env.get('EMAIL_PASS').asString();
  }

  getEmailPort(): any {
    return env.get('EMAIL_PORT').asPortNumber();
  }

  getEmailUsername(): string {
    return env.get('EMAIL_USER').asString();
  }

  getDatabaseUrl(): string {
    return env.get('DATABASE_URL').asString();
  }

  getPaystackKey(): string {
    return env.get('PAYSTACK_KEY').asString();
  }

  getPaystackUrl(): string {
    return env.get('PAYSTACK_URL').asString();
  }

  getPaginationLimit(): number {
    return env.get('PAGINATION_LIMIT').asInt();
  }

  getOpensourceMapsKey(): string {
    return env.get('OPENSOURCEMAPS').asString();
  }

  getOpenRouteUrl(): string {
    return env.get('OPEN_ROUTE_URL').asString();
  }

  getEarthRadius(): number {
    return env.get('EARTH_RADIUS').asInt();
  }
}

export const envConfig = new EnvironmentConfig();
