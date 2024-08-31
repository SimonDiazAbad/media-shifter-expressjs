import { zDbEnv } from "@media-shifter/db/src/env";
import { zRabbitMQEnv, zMinioEnv } from "@media-shifter/commons/src";
import { z } from "zod";

export const zEnv = z
  .object({
    SUPERTOKENS_CONNECTION_URI: z.string(),
    SUPERTOKENS_API_KEY: z.string(),
  })
  .merge(zRabbitMQEnv)
  .merge(zMinioEnv)
  .merge(zDbEnv);

export const ENV = zEnv.parse(process.env);
