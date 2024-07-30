import { PAYMENT_STATUS } from "@prisma/client";
import { OrderEntity } from "../../../entity/order/OrderEntity";

interface IListOrderDTO {
  id: string;
  description: string;
  status: PAYMENT_STATUS;
  orderStatusUpdateAt: number;
  carts: {
    id: string;
    itemName: string;
    quantity: number;
  }[];
  buyer: {
    id: string;
    phoneNumber: string;
    name: string;
  };
}

export const ListOrderDTO = (order: OrderEntity) => {
  return {
    buyer: {
      id: order.buyer?.id,
      name: order.buyer?.name,
      phoneNumber: order.buyer?.phoneNumber,
    },
    carts: order.carts?.map((c) => ({
      id: c.id,
      itemName: c.item?.name,
      quantity: c.quantity,
    })),
    description: order.description,
    id: order.id,
    orderStatusUpdateAt: order.orderStatusUpdated,
    status: order.status,
  } as IListOrderDTO;
};
