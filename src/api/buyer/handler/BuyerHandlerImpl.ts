import { Request, Response, NextFunction } from "express";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { BuyerHandler } from "./BuyerHandler";
import { CartService } from "../../../services/cart/CartService";
import { ListCartDTO } from "../../../utils/dto/cart/IListCartDTO";

export class BuyerHandlerImpl extends BuyerHandler {
  private cartService: CartService;

  constructor(service: { cartService: CartService }) {
    super();
    this.cartService = service.cartService;
  }

  async getBuyerCarts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { userId } = getTokenPayload(res);

    try {
      const carts = await this.cartService.getCartsByUserId(userId);

      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, carts.map(ListCartDTO)));
    } catch (error) {
      return next(error);
    }
  }
}
