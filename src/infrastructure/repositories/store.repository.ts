import { Injectable, Logger } from '@nestjs/common';
import { IStoreRepository } from 'src/domain/repositories/store-repository.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoreRepository implements IStoreRepository {
  private readonly logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(StoreRepository.name);
  }
}
