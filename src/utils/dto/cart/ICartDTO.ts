import { Category, PAYMENT_STATUS } from "@prisma/client";
import { CartEntity } from "../../../entity/cart/CartEntity";

interface ICartDTO {
  cartId: string;
  quantity: number;
  authorName: string;
  authorPhoneNumber: string;
  buyerName: string;
  item: {
    name: string;
    id: string;
    price: number;
    thumbnail: string;
    category: Category;
  };
  orderStatusUpdate: number;
}

export const CartDTO = (cart: CartEntity) => {
  return {
    authorName: cart.item?.author?.name,
    buyerName: cart.buyer?.name,
    cartId: cart.id,
    authorPhoneNumber: cart.item?.author?.phoneNumber,
    item: {
      category: cart.item?.category,
      id: cart.itemId,
      name: cart.item?.name,
      price: cart.item?.price,
      thumbnail: cart.item?.thumbnail,
    },
    quantity: cart.quantity,
    orderStatusUpdate: cart.orderStatusUpdated,
  } as ICartDTO;
};
