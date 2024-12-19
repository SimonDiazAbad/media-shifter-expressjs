import express, { Express, Request, Response } from "express";
import appRouter from "./routes";
import { ENV } from "./constants/env";
import { MessageBrokerService, Queues } from "@media-shifter/commons";
import cors from "cors";
import { middleware } from "supertokens-node/framework/express";
import supertokens from "supertokens-node";
import { errorHandler } from "supertokens-node/framework/express";
import { superTokensInit } from "./init/supertokens";

async function main() {
  const app: Express = express();
  const port = process.env.PORT || 3000;

  await superTokensInit();

  // finish this config later
  app.use(
    cors({
      origin: "http://localhost:3001",
      allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
      credentials: true,
    })
  );

  app.use(middleware());

  // we wait for rabbitmq to be ready
  const messageBroker = MessageBrokerService.getInstance(ENV.RABBITMQ_URL);

  await messageBroker.connect();

  // TODO: move this to an init function
  await messageBroker.assertQueue(Queues.IMAGES.RESIZE);
  await messageBroker.assertQueue(Queues.IMAGES.INVERT);
  await messageBroker.assertQueue(Queues.IMAGES.REMOVE_BACKGROUND);
  await messageBroker.assertQueue(Queues.IMAGES.UPSCALE);

  app.use(appRouter);
  app.use(errorHandler());
  // add own error handler below

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

main();
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node.js docs)
});

// process.on('SIGINT', () => {
//   connection.close();
//   process.exit(0);
// });
