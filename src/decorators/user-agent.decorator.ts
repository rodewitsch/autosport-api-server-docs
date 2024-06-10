import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UAParser } from 'ua-parser-js';

export const UserAgent = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const rawUserAgent = request.headers['user-agent'];
  if (!rawUserAgent) return null;
  const parser = new UAParser(rawUserAgent);
  return parser.getResult();
});
