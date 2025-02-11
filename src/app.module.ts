import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Auth } from './login/providers/auth/auth';
import { LoginController } from './login/login.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service/prisma.service';
import { UserController } from './user/user.controller';
import { ProjectsController } from './projects/projects.controller';
import { Project } from './projects/provider/project/project';

@Module({
  imports: [],
  controllers: [AppController, LoginController, UserController, ProjectsController],
  providers: [AppService, Auth, PrismaService, Project],
})
export class AppModule {}
