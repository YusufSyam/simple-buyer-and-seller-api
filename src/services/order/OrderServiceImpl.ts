import { OrderEntity } from "../../entity/order/OrderEntity";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../utils";
import { IPostOrderPayload } from "../../utils/interfaces/request/IPostOrderPayload";
import { OrderService } from "./OrderService";

export class OrderServiceImpl extends OrderService {
  async getOrders(): Promise<OrderEntity[]> {
    return this.orderRepository.getOrders();
  }

  async getOrdersByBuyerId(userId: string): Promise<OrderEntity[]> {
    const buyer = await this.userRepository.getUserById(userId);

    if (!buyer) {
      throw new NotFoundError(
        ERRORCODE.USER_NOT_FOUND_ERROR,
        "user's not found"
      );
    }

    return this.orderRepository.getOrdersByBuyerId(userId);
  }

  async updateOrderStatusById(id: string, isValid: boolean): Promise<void> {
    const order = await this.orderRepository.getOrderById(id);
    if (!order) {
      throw new NotFoundError(ERRORCODE.COMMON_NOT_FOUND, "order's not found");
    }

    await this.orderItemStockUpdateRepository.updateOrderAndItemStock(
      id,
      isValid,
      order.carts ?? []
    );
  }

  async addOrder(payload: IPostOrderPayload, userId: string): Promise<void> {
    for (let i = 0; i < payload.carts.length; i++) {
      const cart = await this.cartRepository.getCartById(payload.carts[i]);

      if (!cart) {
        throw new NotFoundError(
          ERRORCODE.COMMON_NOT_FOUND,
          "at least one of cart in your order is not found"
        );
      }

      if (cart.buyer?.id !== userId) {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "at least one of cart is not yours"
        );
      }
    }

    const order = new OrderEntity({
      orderStatusUpdated: Math.floor(new Date().getTime() / 1000),
      description: payload.description,
      cartIds: payload.carts,
      buyerId: userId,
    });

    await this.orderItemStockUpdateRepository.insertOrderAndUpdateItemStock(
      order
    );
  }
}
