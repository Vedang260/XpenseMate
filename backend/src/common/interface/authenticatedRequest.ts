import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: number; // Assuming `id` is a number
    username: string;
    role: string;
    iat: number;
    exp: number;
  };
}