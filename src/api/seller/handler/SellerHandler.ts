import { NextFunction, Request, Response } from "express";

export abstract class SellerHandler {
  constructor() {
    this.getSellerCarts = this.getSellerCarts.bind(this);
    this.getSellerOrders = this.getSellerOrders.bind(this);
  }

  abstract getSellerOrders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getSellerCarts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
