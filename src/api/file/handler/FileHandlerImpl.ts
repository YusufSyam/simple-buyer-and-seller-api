import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { FileHandler } from "./FileHandler";
import { RESPONSE_MESSAGE, createResponse } from "../../../utils";

export class FileHandlerImpl extends FileHandler {
  async postFile(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    return res
      .status(201)
      .json(createResponse(RESPONSE_MESSAGE.SUCCESS, req.file?.path));
  }
}
