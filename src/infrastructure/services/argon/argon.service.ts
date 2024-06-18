import { Injectable } from '@nestjs/common';
import { IArgonService } from 'src/domain/adapters/argon.interface';
import * as argon from 'argon2';

@Injectable()
export class ArgonService implements IArgonService {
  async hash(password: string): Promise<string> {
    return await argon.hash(password);
  }
  async verify(hash: string, password: string): Promise<boolean> {
    return await argon.verify(hash, password);
  }
}
