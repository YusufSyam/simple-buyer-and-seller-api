import { Router } from "express";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { ROLE } from "@prisma/client";
import { BuyerHandler } from "../handler/BuyerHandler";

export class BuyerRouterImpl extends BaseRouter {
  private authorizationMiddlware: AuthorizationBearer;
  private handler: BuyerHandler;

  constructor(
    handler: BuyerHandler,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/buyers");
    this.handler = handler;
    this.authorizationMiddlware = authorizationMiddleware;
  }

  register(): Router {
    this.router
      .route(this.path + "/carts")
      .get(
        this.authorizationMiddlware.authorize([ROLE.BUYER]),
        this.handler.getBuyerCarts
      );

    this.router
      .route(this.path + "/orders")
      .get(
        this.authorizationMiddlware.authorize([ROLE.BUYER]),
        this.handler.getBuyerOrders
      );

    return this.router;
  }
}
