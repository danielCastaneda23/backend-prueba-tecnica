import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Auth } from './login/providers/auth/auth';
import { LoginController } from './login/login.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, LoginController],
  providers: [AppService, Auth, PrismaService],
})
export class AppModule {}
