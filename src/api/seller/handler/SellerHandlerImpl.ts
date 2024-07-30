import { Request, Response, NextFunction } from "express";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { CartService } from "../../../services/cart/CartService";
import { SellerHandler } from "./SellerHandler";
import { ListSellerCartDTO } from "../../../utils/dto/cart/IListSellerCartDTO";
import { OrderService } from "../../../services/order/OrderService";
import { ListOrderDTO } from "../../../utils/dto/order/IListOrderDTO";

export class SellerHandlerImpl extends SellerHandler {
  private cartService: CartService;
  private orderService: OrderService;

  constructor(service: {
    cartService: CartService;
    orderService: OrderService;
  }) {
    super();
    this.cartService = service.cartService;
    this.orderService = service.orderService;
  }

  async getSellerOrders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const orders = await this.orderService.getOrders();

    return res
      .status(200)
      .json(createResponse(RESPONSE_MESSAGE.SUCCESS, orders.map(ListOrderDTO)));
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
