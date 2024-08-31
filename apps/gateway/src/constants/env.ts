import path from "path";
import { ENV as DB_ENV } from "@media-shifter/db/src/env";

// TODO: add env validation
export const ENV = {
  RABBITMQ_URL:
    process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672/",
  SUPERTOKENS_CONNECTION_URI: process.env.SUPERTOKENS_CONNECTION_URI,
  SUPERTOKENS_API_KEY: process.env.SUPERTOKENS_API_KEY,
  ...DB_ENV,
};
