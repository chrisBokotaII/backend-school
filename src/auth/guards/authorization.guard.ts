import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../role/decorator';
import { Role } from '../role/enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Retrieve required roles from metadata
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles required, grant access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    // Ensure user and user.role exist
    if (!user || !user.role) {
      return false;
    }

    // Check if user's role matches one of the required roles
    return requiredRoles.includes(user.role);
  }
}
