import { Category, PAYMENT_STATUS } from "@prisma/client";
import { CartEntity } from "../../../entity/cart/CartEntity";

interface IListCartDTO {
  cartId: string;
  quantity: number;
  buyerName: string;
  authorPhoneNumber: string;
  item: {
    name: string;
    id: string;
    price: number;
    thumbnail: string;
    category: Category;
  };
}

export const ListSellerCartDTO = (cart: CartEntity) => {
  return {
    buyerName: cart.buyer?.name,
    authorPhoneNumber: cart.item?.author?.phoneNumber,
    cartId: cart.id,
    item: {
      category: cart.item?.category,
      id: cart.itemId,
      name: cart.item?.name,
      price: cart.item?.price,
      thumbnail: cart.item?.thumbnail,
    },
    quantity: cart.quantity,
  } as IListCartDTO;
};
