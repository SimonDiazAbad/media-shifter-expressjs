import path from "path";
import { ENV as DB_ENV } from "@media-shifter/db/src/env";

// TODO: add env validation
export const ENV = {
  RABBITMQ_URL:
    process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672/",
  ...DB_ENV,
};
