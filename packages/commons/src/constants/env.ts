// TODO: add env validation
import { z } from "zod";

export const zRabbitMQEnv = z.object({
  RABBITMQ_URL: z.string(),
});

export const zMinioEnv = z.object({
  MINIO_ENDPOINT: z.string(),
  MINIO_PORT: z.string(),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
});
