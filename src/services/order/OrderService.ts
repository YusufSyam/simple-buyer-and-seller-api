import { OrderEntity } from "../../entity/order/OrderEntity";
import { CartRepository } from "../../repository/cart/CartRepository";
import { OrderItemStockUpdate } from "../../repository/facade/OrderItemStockUpdate/OrderItemStockUpdate";
import { OrderRepository } from "../../repository/order/OrderRepository";
import { UserRepository } from "../../repository/user/UserRepository";
import { IPostOrderPayload } from "../../utils/interfaces/request/IPostOrderPayload";

export abstract class OrderService {
  protected cartRepository: CartRepository;
  protected orderRepository: OrderRepository;
  protected orderItemStockUpdateRepository: OrderItemStockUpdate;
  protected userRepository: UserRepository;

  constructor(repository: {
    cartRepository: CartRepository;
    orderRepository: OrderRepository;
    orderItemStockUpdateRepository: OrderItemStockUpdate;
    userRepository: UserRepository;
  }) {
    this.cartRepository = repository.cartRepository;
    this.orderRepository = repository.orderRepository;
    this.userRepository = repository.userRepository;
    this.orderItemStockUpdateRepository =
      repository.orderItemStockUpdateRepository;
  }

  abstract getOrders(): Promise<OrderEntity[]>;

  abstract getOrdersByBuyerId(userId: string): Promise<OrderEntity[]>;

  abstract updateOrderStatusById(id: string, isValid: boolean): Promise<void>;

  abstract addOrder(payload: IPostOrderPayload, userId: string): Promise<void>;
}
