import { Router } from "express";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { ROLE } from "@prisma/client";
import { OrderHandler } from "../handler/OrderHandler";

export class OrderRouterImpl extends BaseRouter {
  private authorizationMiddlware: AuthorizationBearer;
  private handler: OrderHandler;

  constructor(
    handler: OrderHandler,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/orders");
    this.handler = handler;
    this.authorizationMiddlware = authorizationMiddleware;
  }

  register(): Router {
    this.router
      .route(this.path)
      .post(
        this.authorizationMiddlware.authorize([ROLE.BUYER]),
        this.handler.postOrder
      );

    this.router
      .route(this.path + "/:id")
      .put(
        this.authorizationMiddlware.authorize([ROLE.SELLER]),
        this.handler.putOrderStatus
      );

    return this.router;
  }
}
