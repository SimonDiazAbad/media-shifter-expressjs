import express, { Express, Request, Response } from "express";
import appRouter from "./routes";

const app: Express = express();
const port = process.env.PORT || 3000;

// app.get("/", (req: Request, res: Response) => {
//   res.send("root");
// });

app.use(appRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// app.use(appRouter);

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node.js docs)
});
