import path from "path";

// TODO: add env validation
export const ENV = {
  RABBITMQ_URL:
    process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672/",
};
