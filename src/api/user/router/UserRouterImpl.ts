import { Router } from "express";
import { UserHandler } from "../handler/UserHandler";
import { BasicAuthMiddleware } from "../../../middleware/auth/BasicAuth";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { ROLE } from "@prisma/client";

export class UserRouterImpl extends BaseRouter {
  private basicAuthMiddleware: BasicAuthMiddleware;
  private authorizationMiddlware: AuthorizationBearer;
  private handler: UserHandler;

  constructor(
    handler: UserHandler,
    basicAuthMiddleware: BasicAuthMiddleware,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/users");
    this.handler = handler;
    this.basicAuthMiddleware = basicAuthMiddleware;
    this.authorizationMiddlware = authorizationMiddleware;
  }

  register(): Router {
    // * create buyer / seller
    // * get user credential
    this.router
      .route(this.path)
      .post(this.handler.postUser)
      .get(
        this.authorizationMiddlware.authorize([ROLE.BUYER, ROLE.SELLER]),
        this.handler.getUserCredential
      );

    // * user login
    this.router
      .route(this.path + "/login")
      .post(
        this.basicAuthMiddleware.authenticate(),
        this.handler.postUserLogin
      );

    // // * get users master
    // this.router
    //   .route(this.path + "/master")
    //   .get(
    //     this.authorizationMiddlware.authorize(),
    //     this.handler.getUsersMaster
    //   );

    // // * delete user by id
    // this.router
    //   .route(this.path + "/:userId/master")
    //   .delete(
    //     this.authorizationMiddlware.authorize(),
    //     this.handler.deleteUserMaster
    //   );

    return this.router;
  }
}
