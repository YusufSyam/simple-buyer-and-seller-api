import { NextFunction, Request, Response } from "express";

export abstract class BuyerHandler {
  constructor() {
    this.getBuyerCarts = this.getBuyerCarts.bind(this);
    this.getBuyerOrders = this.getBuyerOrders.bind(this);
  }

  abstract getBuyerOrders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getBuyerCarts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
