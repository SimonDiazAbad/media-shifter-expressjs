import express, { Express, Request, Response } from "express";
import appRouter from "./routes";
// import { ENV } from "@media-shifter/commons";
import { ENV, MessageBrokerService, Queues } from "@media-shifter/commons";

async function main() {
  const app: Express = express();
  const port = process.env.PORT || 3000;

  // we wait for rabbitmq to be ready
  const messageBroker = MessageBrokerService.getInstance(ENV.rabbitmqUrl);

  await messageBroker.connect();

  // TODO: move this to an init function
  await messageBroker.assertQueue(Queues.IMAGE.RESIZE);
  await messageBroker.assertQueue(Queues.IMAGE.INVERT);
  await messageBroker.assertQueue(Queues.IMAGE.REMOVE_BACKGROUND);
  await messageBroker.assertQueue(Queues.IMAGE.UPSCALE);

  app.use(appRouter);

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
