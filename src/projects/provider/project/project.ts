import { Auth } from 'src/login/providers/auth/auth';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class Project {
  constructor(
    private prismaService: PrismaService,
    private authService: Auth,
  ) {}

  public async createProject(
    projectCreationFields: { [key: string]: any },
    token: string,
  ) {
    const res: any = await this.authService.validateToken(token);

    try {
      const response = await this.prismaService.projects.create({
        data: {
          name: projectCreationFields['name'],
          description: projectCreationFields['description'],
          state: projectCreationFields['state'],
          ownerId: res.userId,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAllProjects(token: string) {
    const { userId }: { userId: string } =
      await this.authService.validateToken(token);

    try {
      const response = await this.prismaService.projects.findMany({
        where: {
          ownerId: userId,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteProject(id: string) {
    try {
      const response = await this.prismaService.projects.delete({
        where: {
          id,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
