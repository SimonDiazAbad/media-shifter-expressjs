import express, { Express, Request, Response, Router } from "express";
import { getRabbitmqConnection } from "@media-shifter/commons";

const resizerRouter: Router = express.Router();

// resizerRouter.get("/image-dimensions", imageDimensionsController);
resizerRouter.get("/image-dimensions", async (req: Request, res: Response) => {
  const connection = await getRabbitmqConnection("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "TEST";

  await channel.assertQueue(queue);
  const message = "TEST12sdd3";

  channel.sendToQueue(queue, Buffer.from(message));

  console.log(`sent to rabbitmq: ${message}`);

  res.send("image-dimensions");
});

export default resizerRouter;
