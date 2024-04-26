import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IAuthUser {
  id: string;
  roles?: string[];
}

export const GetAuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IAuthUser => {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    return request.user;
  },
);
