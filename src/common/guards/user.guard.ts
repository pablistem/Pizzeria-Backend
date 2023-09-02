import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Importa el servicio JWT

@Injectable()
export class UserGuard {
  constructor(private readonly jwtService: JwtService) {}
}
