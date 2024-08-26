import express, { Request, Response, Router } from "express";
import { MessageBrokerService, Queues } from "@media-shifter/commons";

// TOOD: create minio service
import * as Minio from "minio";

const resizeRouter: Router = express.Router();

resizeRouter.get("/", async (req: Request, res: Response) => {
  console.log(req.path);
  const messageBroker = MessageBrokerService.getInstance();

  const minioClient = new Minio.Client({
    endPoint: "minio",
    port: 9000,
    useSSL: false,
    accessKey: "user",
    secretKey: "password",
  });

  const imageUri = String(Math.round(Math.random() * 1000));

  const bucket = "images";

  const exists = await minioClient.bucketExists(bucket);
  if (exists) {
    console.log("Bucket " + bucket + " exists.");
  } else {
    await minioClient.makeBucket(bucket, "us-east-1");
    console.log("Bucket " + bucket + ' created in "us-east-1".');
  }

  await minioClient.putObject(
    bucket,
    `input/${imageUri}.png`,
    "Hello, it worked."
  );

  //  we generate a image uri using Math.random()
  // multiplied by 1000 and rounded to the nearest integer

  const resizeData = {
    imageUri: `${imageUri}.png`,
    targetWidth: 100,
    targetHeight: 100,
    userId: "1",
  };

  messageBroker.publishToQueue(Queues.IMAGE.RESIZE, resizeData);

  res.send("dimensions");
});

export default resizeRouter;
