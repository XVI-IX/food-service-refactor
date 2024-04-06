import { HttpException, HttpStatus } from '@nestjs/common';
import { ServiceInterface } from 'src/domain/adapters';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class HttpResponse {
  static send<T = any, U = any>(message: string, data: ServiceInterface<T, U>) {
    return {
      status: true,
      message,
      data: data && data.data ? data.data : UUID,
    };
  }

  static error(
    code: string,
    message: string,
    content: Record<string, unknown>,
  ) {
    const data = {
      status: false,
      message,
      data: content,
    };

    throw new HttpException(data, HttpStatus[code]);
  }
}
