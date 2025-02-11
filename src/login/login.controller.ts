import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginPipe } from './pipe/login.pipe';
import { userSchemaLogin } from './schemas/login.schema';
import { Auth } from './providers/auth/auth';

@Controller('login')
export class LoginController {
  constructor(private authServide: Auth) {}
  @Post()
  @UsePipes(new LoginPipe(userSchemaLogin))
  async authLogin(
    @Body()
    userInfo: typeof userSchemaLogin,
    @Res() res: Response,
  ) {
    try {
      const token = await this.authServide.validateUser(userInfo);
      console.log(token);
      if (token) {
        res.status(HttpStatus.ACCEPTED).json({
          token: token,
        });
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }
}
