import { CartEntity } from "../../../entity/cart/CartEntity";
import { OrderEntity } from "../../../entity/order/OrderEntity";
import { CartRepository } from "../../cart/CartRepository";

export abstract class OrderItemStockUpdate {
  protected cartRepository: CartRepository;

  constructor(repository: { cartRepository: CartRepository }) {
    this.cartRepository = repository.cartRepository;
  }

  abstract updateOrderAndItemStock(
    id: string,
    isValid: boolean,
    carts: CartEntity[]
  ): Promise<void>;
  abstract insertOrderAndUpdateItemStock(order: OrderEntity): Promise<void>;
}
