import { NextFunction, Request, Response } from "express";
import { EntityNotFoundError } from "typeorm";
import { ResponseUtl } from "./Response";
export class ErrorHandler {
  static catchErr(fn) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  static handlerError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log(err);
    if (err instanceof EntityNotFoundError) {
      return ResponseUtl.sendError(
        res,
        "Item/page you r looking for dose not exit",
        404,
        null
      );
    }

    if (err.message === "Invalid file type") {
      return ResponseUtl.sendError(res, "Invalid file type", 422, null);
    }

    return res.status(500).send({
      success: false,
      message: "Somthing went wrong",
    });
  }
}
