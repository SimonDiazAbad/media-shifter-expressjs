import express, { Router } from "express";
import imagesRouter from "./images";

const routerV1: Router = express.Router();

routerV1.use("/images", imagesRouter);

export default routerV1;
