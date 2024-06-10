import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor() {}

  use(req: any, _res: Response, next: () => void) {
    return next();
  }
}
