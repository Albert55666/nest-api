import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomeRequest } from '../type';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: CustomeRequest = ctx.switchToHttp().getRequest();

    if (data) {
      return request.user?.[data];
    }

    return request.user;
  },
);
