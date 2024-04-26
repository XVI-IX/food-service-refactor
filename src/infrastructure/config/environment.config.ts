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

  getResetSecret(): string {
    return env.get('RESET_SECRET').asString();
  }
}

export const envConfig = new EnvironmentConfig();
