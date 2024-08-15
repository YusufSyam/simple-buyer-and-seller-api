import { Category, PAYMENT_STATUS } from "@prisma/client";
import { OrderEntity } from "../../../entity/order/OrderEntity";

interface IListOrderDTO {
  id: string;
  description: string;
  status: PAYMENT_STATUS;
  orderStatusUpdateAt: number;
  carts: {
    id: string;
    item: {
      id: string;
      name: string;
      category: Category;
      stock: number;
      thumbnail: string;
      price: number;
    };
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
      item: {
        id: c.item?.id,
        name: c.item?.name,
        stock: c.item?.stock,
        thumbnail: c.item?.thumbnail,
        category: c.item?.category,
        price: c.item?.price,
      },
      quantity: c.quantity,
    })),
    description: order.description,
    id: order.id,
    orderStatusUpdateAt: order.orderStatusUpdated,
    status: order.status,
  } as IListOrderDTO;
};
