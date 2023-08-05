import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // Importa tu RoleEnum aquí
import { JwtService } from '@nestjs/jwt'; // Importa el servicio JWT
import { RoleEnum } from '../../domain/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = RoleEnum.admin;
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      return false;
    }

    try {
      const decodedToken = this.jwtService.verify(token.replace('Bearer ', ''));
      const user = decodedToken.user;

      if (!user || user.role !== requiredRole) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
