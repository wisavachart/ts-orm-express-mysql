import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import { EntityNotFoundError } from "typeorm";
import { ResponseUtl } from "../utils/Response";
import authorRoute from "./routes/authors";
const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/authors", authorRoute);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid route",
  });
});

//middle where to handle error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof EntityNotFoundError) {
    return ResponseUtl.sendError(
      res,
      "Item/page you r looking for dose not exit",
      404,
      null
    );
  }

  return res.status(500).send({
    success: false,
    message: "Somthing went wrong",
  });
});

export default app;
