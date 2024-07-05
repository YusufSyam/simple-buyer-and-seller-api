import { NextFunction, Request, Response } from "express";

export abstract class UserHandler {
  constructor() {
    this.postUserLogin = this.postUserLogin.bind(this);
    this.getUserCredential = this.getUserCredential.bind(this);
    this.postUser = this.postUser.bind(this);
    // this.getUsersMaster = this.getUsersMaster.bind(this);
    // this.deleteUserMaster = this.deleteUserMaster.bind(this);
  }

  // abstract deleteUserMaster(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<any>;

  // abstract getUsersMaster(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<any>;

  abstract getUserCredential(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
  abstract postUserLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract postUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
