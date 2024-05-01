import { HttpException, HttpStatus } from '@nestjs/common';
import { ServiceInterface } from 'src/domain/adapters';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class HttpResponse {
  static send<T = any>(message: string, data: ServiceInterface<T>) {
    return {
      status: true,
      message,
      data: data && data.data ? data.data : UUID,
      page: data && data.page ? data.page : 1,
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
