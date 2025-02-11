import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Project } from './provider/project/project';
import { Request, Response } from 'express';
import { ValidateTokenGuard } from './validate-token/validate-token.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private project: Project) {}
  @Post('/create')
  @UseGuards(ValidateTokenGuard)
  async createProject(
    @Body() projectPayload: { [key: string]: string },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const [_, token] = req.headers.authorization?.split(' ') ?? [];

      const response = await this.project.createProject(projectPayload, token);
      res.status(HttpStatus.CREATED).json({ response });
    } catch (error) {
      res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ error: error.message });
    }
  }

  @Get('/get-all')
  async getAllProjects(@Req() req: Request, @Res() res: Response) {
    const [_, token] = req.headers.authorization?.split(' ') ?? [];
    try {
      const [_, token] = req.headers.authorization?.split(' ') ?? [];

      const response = await this.project.getAllProjects(token);
      res.status(HttpStatus.CREATED).json({ response });
    } catch (error) {
      res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ error: error.message });
    }
  }

  @Delete('/delete/:id')
  async deleteProject(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const response = await this.project.deleteProject(id);
      res.status(HttpStatus.CREATED).json({ response });
    } catch (error) {
      res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ error: error.message });
    }
  }
}
