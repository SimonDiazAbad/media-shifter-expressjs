import express, { Router } from "express";
import resizerRouter from "./resize/resize.router";

const imagesRouter: Router = express.Router();

imagesRouter.use("/resize", resizerRouter);

export default imagesRouter;
