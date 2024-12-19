import { z } from "zod";

export const zDbEnv = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  // NODE_ENV: z.string(),
});

export const DB_ENV = zDbEnv.parse(process.env);
