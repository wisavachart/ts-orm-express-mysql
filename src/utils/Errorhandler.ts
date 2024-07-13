import { NextFunction, Request, Response } from "express";
export class ErrorHandler {
  static handlerError(func) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(func(req, res, next)).catch(next);
    };
  }
}
