import { NextFunction, Request, Response } from "express";

export abstract class BuyerHandler {
  constructor() {
    this.getBuyerCarts = this.getBuyerCarts.bind(this);
  }

  abstract getBuyerCarts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
