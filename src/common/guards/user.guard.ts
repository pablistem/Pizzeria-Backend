import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard {
  constructor(private readonly jwtService: JwtService) {}
}
