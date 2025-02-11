import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Auth } from 'src/login/providers/auth/auth';
import { TokenGuard } from './token/token.guard';

@Controller('user')
export class UserController {
  constructor(private authServide: Auth) {}
  @Post('/validate-token')
  async validateToken(
    @Body() payload: { [key: string]: string },
    @Res() res: Response,
  ) {
    try {
      const { isValid: isValid } = await this.authServide.validateToken(
        payload.token,
      );
      res.status(HttpStatus.ACCEPTED).json({ isValid });
    } catch (error) {
      res.status(HttpStatus.FORBIDDEN).json({ error: error.message });
    }
  }

  @Post('/create')
  @UseGuards(TokenGuard)
  createUser(@Body() payload: { [key: string]: string }, @Res() res: Response) {
    console.log('YOU CAN CREATE USERS');
  }
}
