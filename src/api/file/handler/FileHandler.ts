import { NextFunction, Request, RequestHandler, Response } from "express";

export abstract class FileHandler {
  constructor() {
    this.postFile = this.postFile.bind(this);
  }

  abstract postFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
