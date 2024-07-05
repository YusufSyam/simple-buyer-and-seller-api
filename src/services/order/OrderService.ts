import { CartRepository } from "../../repository/cart/CartRepository";
import { OrderItemStockUpdate } from "../../repository/facade/OrderItemStockUpdate/OrderItemStockUpdate";
import { OrderRepository } from "../../repository/order/OrderRepository";
import { IPostOrderPayload } from "../../utils/interfaces/request/IPostOrderPayload";

export abstract class OrderService {
  protected cartRepository: CartRepository;
  protected orderRepository: OrderRepository;
  protected orderItemStockUpdateRepository: OrderItemStockUpdate;

  constructor(repository: {
    cartRepository: CartRepository;
    orderRepository: OrderRepository;
    orderItemStockUpdateRepository: OrderItemStockUpdate;
  }) {
    this.cartRepository = repository.cartRepository;
    this.orderRepository = repository.orderRepository;
    this.orderItemStockUpdateRepository =
      repository.orderItemStockUpdateRepository;
  }

  abstract updateOrderStatusById(
    id: string,
    isValid: boolean,
    userId: string
  ): Promise<void>;

  abstract addOrder(payload: IPostOrderPayload, userId: string): Promise<void>;
}
