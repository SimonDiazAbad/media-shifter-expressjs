import express, { Request, Response, Router } from "express";
import { MessageBrokerService, Queues } from "@media-shifter/commons";

const resizeRouter: Router = express.Router();

resizeRouter.get("/", async (req: Request, res: Response) => {
  console.log(req.path);
  const messageBroker = MessageBrokerService.getInstance();

  const resizeData = {
    imageUri: "./images/test.png",
    targetWidth: 100,
    targetHeight: 100,
    userId: "1",
  };

  messageBroker.publishToQueue(Queues.IMAGE.RESIZE, resizeData);

  res.send("dimensions");
});

export default resizeRouter;
