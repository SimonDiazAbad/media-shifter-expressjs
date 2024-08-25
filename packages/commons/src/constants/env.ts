import dotenv from "dotenv";
import path from "path";

const dotenvPath = process.env.NODE_ENV === "test" ? ".env.test" : ".env";

dotenv.config({
  path: path.resolve(__dirname, `../../${dotenvPath}`),
});

// TODO: add env validation
export const ENV = {
  rabbitmqUrl: process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672/",
};
