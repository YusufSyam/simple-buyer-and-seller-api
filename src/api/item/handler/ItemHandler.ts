import { NextFunction, Request, Response } from "express";

export abstract class ItemHandler {
  constructor() {
    this.postItem = this.postItem.bind(this);
    this.getItems = this.getItems.bind(this);
    this.getItem = this.getItem.bind(this);
    this.putItem = this.putItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  abstract getItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract putItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract deleteItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract postItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
