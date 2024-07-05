import { NextFunction, Request, Response } from "express";

export abstract class SellerHandler {
  constructor() {
    this.getSellerCarts = this.getSellerCarts.bind(this);
  }

  abstract getSellerCarts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
