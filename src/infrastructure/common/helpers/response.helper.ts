import { HttpException, HttpStatus } from '@nestjs/common';
import { ServiceInterface } from '../../../domain/adapters';

export class HttpResponse {
  static send<T = any>(message: string, data: ServiceInterface<T>) {
    return {
      status: true,
      message,
      data: data && data.data ? data.data : null,
      page: data && data.page ? data.page : 1,
      token: data && data.token ? data.token : null,
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
