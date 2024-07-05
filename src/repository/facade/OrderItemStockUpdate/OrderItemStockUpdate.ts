import { OrderEntity } from "../../../entity/order/OrderEntity";
import { CartRepository } from "../../cart/CartRepository";

export abstract class OrderItemStockUpdate {
  protected cartRepository: CartRepository;

  constructor(repository: { cartRepository: CartRepository }) {
    this.cartRepository = repository.cartRepository;
  }

  abstract insertOrderAndUpdateItemStock(order: OrderEntity): Promise<void>;
}
