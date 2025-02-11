import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { ZodSchema } from 'zod';

@Injectable()
export class LoginPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  async transform(value: unknown, _metadata: ArgumentMetadata) {
    try {
      const validation = await this.schema.parseAsync(value);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return validation;
    } catch (error: any) {
      throw new BadRequestException('Validation failed', error);
    }
  }
}
