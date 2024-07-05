import { CartEntity } from "../../../entity/cart/CartEntity";

export abstract class CartItemStockUpdate {
  abstract updateCartOrderStatusAndItemStock(
    cart: CartEntity,
    isValid: boolean
  ): Promise<void>;

  abstract addCartAndUpdateItemStock(cart: CartEntity): Promise<void>;
}
