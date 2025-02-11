import { z } from 'zod';

export const userSchemaLogin = z
  .object({
    email: z.string().email('Email Not Good Structured'),
    password: z.string(),
  })
  .required();

export const userSchemaUpdating = z.object({
  email: z.string().email('Email Not Good Structured'),
});
