import { Request, Response, NextFunction } from "express";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { CartService } from "../../../services/cart/CartService";
import { SellerHandler } from "./SellerHandler";
import { ListSellerCartDTO } from "../../../utils/dto/cart/IListSellerCartDTO";

export class SellerHandlerImpl extends SellerHandler {
  private cartService: CartService;

  constructor(service: { cartService: CartService }) {
    super();
    this.cartService = service.cartService;
  }

  async getSellerCarts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { userId } = getTokenPayload(res);

    try {
      const carts = await this.cartService.getCartsByItemAuthorId(userId);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, carts.map(ListSellerCartDTO))
        );
    } catch (error) {
      return next(error);
    }
  }
}
