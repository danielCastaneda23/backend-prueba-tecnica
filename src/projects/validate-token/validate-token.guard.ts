import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Auth } from 'src/login/providers/auth/auth';
import { Observable } from 'rxjs';

@Injectable()
export class ValidateTokenGuard implements CanActivate {
  constructor(private authService: Auth) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    const { isValid, role } = await this.authService.validateToken(token);
    if (!!isValid && (role === 'admin' || role === 'user')) return isValid;
    else {
      throw new UnauthorizedException({
        message: 'no tienes los permisos necesarios para esta peticion',
      });
    }
  }
}
