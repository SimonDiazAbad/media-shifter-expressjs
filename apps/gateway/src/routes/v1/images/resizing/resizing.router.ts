import express, { Request, Response, Router } from "express";
import { getRabbitmqConnection } from "@media-shifter/commons";

const resizerRouter: Router = express.Router();

// resizerRouter.get("/image-dimensions", imageDimensionsController);
resizerRouter.get("/image-dimensions", async (req: Request, res: Response) => {
  console.log("image-dimensions");
  const connection = await getRabbitmqConnection("amqp://rabbitmq");
  const channel = await connection.createChannel();
  const queue = "TEST";

  await channel.assertQueue(queue);
  const message = "new message";

  channel.sendToQueue(queue, Buffer.from(message));

  console.log(`sent to rabbitmq: ${message}`);

  res.send("image-dimensions");
});

export default resizerRouter;
