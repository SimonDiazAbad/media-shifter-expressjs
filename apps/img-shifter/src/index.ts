if (true) {
  console.log("Starting img-shifter microservice...");
}
console.log("Starting img-shifter microservice...");

import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("root");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node.js docs)
});
