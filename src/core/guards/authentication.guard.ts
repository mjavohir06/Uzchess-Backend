import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { RolesKey } from '@/core/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<Role[]>(RolesKey, [context.getHandler(), context.getClass()]);
    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    let accessToken: string | undefined;
    if (req.cookies && req.cookies.accessToken) {
      accessToken = req.cookies.accessToken;

    } else if (req.handshake && req.handshake.headers.authorization) {
      accessToken = req.handshake.headers.authorization;
    }

    if (!accessToken) {
      throw new UnauthorizedException('Credentials not found');
    }

    if (!accessToken || accessToken === '') {
      throw new UnauthorizedException('Wrong credentials format');
    }

    try {
      req.user = await this.jwtService.verify(accessToken);
      return true;
    } catch (exc) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
