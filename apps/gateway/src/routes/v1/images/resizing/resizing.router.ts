import express, { Request, Response, Router } from "express";
import { getRabbitmqConnection } from "@media-shifter/commons";
import { Queues } from "@media-shifter/commons";

const resizerRouter: Router = express.Router();

// resizerRouter.get("/image-dimensions", imageDimensionsController);
resizerRouter.get("/invert", async (req: Request, res: Response) => {
  console.log(req.path);
  const connection = await getRabbitmqConnection("amqp://rabbitmq");
  const channel = await connection.createChannel();
  const queue = Queues.IMAGE.INVERT;

  await channel.assertQueue(queue);
  const message = "new message";

  channel.sendToQueue(queue, Buffer.from(message));

  console.log(`sent to rabbitmq: ${message}`);

  res.send("dimensions");
});

export default resizerRouter;
