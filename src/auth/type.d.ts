import { Request } from 'express';

interface CustomeRequest extends Request {
  // user?: { sub: number; email: string };
  user?: any;
}
