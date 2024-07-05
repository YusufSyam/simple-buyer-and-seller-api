import { OrderEntity } from "../../entity/order/OrderEntity";

export abstract class OrderRepository {
  abstract insertOrder(order: OrderEntity): Promise<void>;
}
