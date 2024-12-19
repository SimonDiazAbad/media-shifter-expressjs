import express, { Router } from "express";
import routerV1 from "./v1/index";

const appRouter: Router = express.Router();

appRouter.use("/v1", routerV1);

export default appRouter;
