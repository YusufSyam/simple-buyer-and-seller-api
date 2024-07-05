import { Router } from "express";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { ROLE } from "@prisma/client";
import { SellerHandler } from "../handler/SellerHandler";

export class SellerRouterImpl extends BaseRouter {
  private authorizationMiddlware: AuthorizationBearer;
  private handler: SellerHandler;

  constructor(
    handler: SellerHandler,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/sellers");
    this.handler = handler;
    this.authorizationMiddlware = authorizationMiddleware;
  }

  register(): Router {
    this.router
      .route(this.path + "/carts")
      .get(
        this.authorizationMiddlware.authorize([ROLE.SELLER]),
        this.handler.getSellerCarts
      );

    return this.router;
  }
}
