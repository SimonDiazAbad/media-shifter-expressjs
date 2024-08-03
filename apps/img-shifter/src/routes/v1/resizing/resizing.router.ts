import express, { Express, Request, Response, Router } from "express";

const resizerRouter: Router = express.Router();

// resizerRouter.get("/image-dimensions", imageDimensionsController);
resizerRouter.get("/image-dimensions", (req: Request, res: Response) => {
    res.send("image-dimensions");
});

export default resizerRouter;