import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // Importa tu RoleEnum aquí
import { JwtService } from '@nestjs/jwt'; // Importa el servicio JWT
import { RoleEnum } from '../../module/user/domain/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = RoleEnum.admin;
    const request = context.switchToHttp().getRequest();
    const token = request.headers.refreshtoken;
    if (!token) {
      return false;
    }
    try {
      const decodedToken = this.jwtService.verify(token.replace('Bearer ', ''));

      if (decodedToken.role !== requiredRole) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  
}
