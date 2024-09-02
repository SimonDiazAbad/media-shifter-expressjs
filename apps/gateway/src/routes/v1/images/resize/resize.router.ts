import express, { Request, Response, Router } from "express";
import {
  MessageBrokerService,
  Queues,
  ObjectStorageService,
  Buckets,
  JobStatus,
  zImageResizeJobParams,
  ImageJobType,
} from "@media-shifter/commons";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { db } from "@media-shifter/db";
import {
  imageJobsSchema,
  ImageJobDbInsert,
} from "@media-shifter/db/src/schemas";
import { v4 as uuidv4 } from "uuid";

const resizeRouter: Router = express.Router();

resizeRouter.get("/", verifySession(), async (req: Request, res: Response) => {
  // @ts-expect-error
  const userId = req.session.getUserId();
  const jobId = uuidv4();

  const messageBroker = MessageBrokerService.getInstance();
  const objectStorage = ObjectStorageService.getInstance();

  // get extension from file
  const fileExtension = "png";
  const imageUri = `${jobId}.${fileExtension}`;

  const putResult = await objectStorage.putObjectWrapper({
    bucket: Buckets.IMAGES,
    dataType: "input",
    objectName: imageUri,
    stream: "Testing...",
  });

  const jobParams = zImageResizeJobParams.parse({
    targetWidth: 100,
    targetHeight: 100,
  });

  // TODO create util to create image jobs
  const [result] = await db
    .insert(imageJobsSchema)
    .values({
      id: jobId,
      jobStatus: JobStatus.PENDING,
      userId: userId,
      inputUri: imageUri,
      jobType: ImageJobType.RESIZE,
      jobParams: jobParams,
    })
    .returning();

  const resizeData = {
    jobId: result.id,
  };

  messageBroker.publishToQueue(Queues.IMAGES.RESIZE, resizeData);

  res.send({
    userId: userId,
    jobId: result.id,
    imageUri: imageUri,
  });
});

export default resizeRouter;
