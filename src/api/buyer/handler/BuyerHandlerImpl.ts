import { Request, Response, NextFunction } from "express";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { BuyerHandler } from "./BuyerHandler";
import { CartService } from "../../../services/cart/CartService";
import { ListCartDTO } from "../../../utils/dto/cart/IListCartDTO";
import { OrderService } from "../../../services/order/OrderService";
import { ListOrderDTO } from "../../../utils/dto/order/IListOrderDTO";

export class BuyerHandlerImpl extends BuyerHandler {
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

  async getBuyerOrders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { userId } = getTokenPayload(res);

    try {
      const orders = await this.orderService.getOrdersByBuyerId(userId);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, orders.map(ListOrderDTO))
        );
    } catch (error) {
      return next(error);
    }
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
