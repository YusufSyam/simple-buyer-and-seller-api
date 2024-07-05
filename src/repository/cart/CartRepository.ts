import { CartEntity } from "../../entity/cart/CartEntity";

export abstract class CartRepository {
  abstract deleteCartById(id: string): Promise<void>;
  
  abstract getCartsByItemAuthorId(userId: string): Promise<CartEntity[]>;

  abstract getCartById(id: string): Promise<CartEntity | null>;

  abstract getCartsByUserId(userId: string): Promise<CartEntity[]>;

  abstract addCart(cart: CartEntity): Promise<void>;
}
