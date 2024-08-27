import express, { Request, Response, Router } from "express";
import {
  MessageBrokerService,
  Queues,
  ObjectStorageService,
  Buckets,
  ENV,
} from "@media-shifter/commons";
import * as Minio from "minio";

const resizeRouter: Router = express.Router();

resizeRouter.get("/", async (req: Request, res: Response) => {
  console.log(req.path);
  const messageBroker = MessageBrokerService.getInstance();
  const objectStorage = ObjectStorageService.getInstance();

  const imageUri = String(Math.round(Math.random() * 1000));

  const putResult = await objectStorage.putObjectWrapper({
    bucket: Buckets.IMAGES,
    dataType: "input",
    objectName: `${imageUri}.png`,
    stream: "Testing...",
  });

  console.log({
    putResult,
  });

  const resizeData = {
    imageUri: `${imageUri}.png`,
    targetWidth: 100,
    targetHeight: 100,
    userId: "1",
  };

  messageBroker.publishToQueue(Queues.IMAGES.RESIZE, resizeData);

  res.send("dimensions");
});

export default resizeRouter;
