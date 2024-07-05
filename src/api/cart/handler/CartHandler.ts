import { NextFunction, Request, Response } from "express";

export abstract class CartHandler {
  constructor() {
    this.postCart = this.postCart.bind(this);
    this.putCartOrderStatus = this.putCartOrderStatus.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
    this.getCart = this.getCart.bind(this);
  }

  abstract getCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract deleteCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract putCartOrderStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract postCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
