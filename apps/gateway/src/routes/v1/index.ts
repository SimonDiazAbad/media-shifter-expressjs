import express, { Express, Request, Response, Router } from "express";
import resizerRouter from "./resizing/resizing.router";

const routerV1: Router = express.Router();

routerV1.use("/resizing", resizerRouter);

export default routerV1;
