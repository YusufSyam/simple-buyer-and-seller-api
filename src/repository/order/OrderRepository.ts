import { OrderEntity } from "../../entity/order/OrderEntity";

export abstract class OrderRepository {
  abstract getOrderById(id: string): Promise<OrderEntity | null>;
  abstract getOrders(): Promise<OrderEntity[]>;
  abstract getOrdersByBuyerId(userId: string): Promise<OrderEntity[]>;
  abstract insertOrder(order: OrderEntity): Promise<void>;
}
