import express, { Router } from "express";
import resizerRouter from "./resizing/resizing.router";

const imagesRouter: Router = express.Router();

imagesRouter.use("/resizing", resizerRouter);

export default imagesRouter;
