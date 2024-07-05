import { NextFunction, Request, Response } from "express";

export abstract class OrderHandler {
  constructor() {
    this.postOrder = this.postOrder.bind(this);
  }
  abstract putOrderStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract postOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
