import { CartEntity } from "../../entity/cart/CartEntity";
import { CartRepository } from "../../repository/cart/CartRepository";
import { CartItemStockUpdate } from "../../repository/facade/CartItemStockUpdate/CartItemStockUpdate";
import { ItemRepository } from "../../repository/item/ItemRepository";
import { IPostCartPayload } from "../../utils/interfaces/request/IPostCartPayload";

export abstract class CartService {
  protected cartRepository: CartRepository;
  protected itemRepository: ItemRepository;
  protected cartItemStockUpdateRepository: CartItemStockUpdate;

  constructor(repository: {
    cartRepository: CartRepository;
    itemRepository: ItemRepository;
    cartItemStockUpdateRepository: CartItemStockUpdate;
  }) {
    this.cartRepository = repository.cartRepository;
    this.itemRepository = repository.itemRepository;
    this.cartItemStockUpdateRepository =
    repository.cartItemStockUpdateRepository;
  }
  
  abstract getCartById(id: string, userId: string): Promise<CartEntity>;

  abstract deleteCartById(id: string, userId: string): Promise<void>;

  abstract getCartsByItemAuthorId(userId: string): Promise<CartEntity[]>;

  abstract updateCartOrderStatusById(
    id: string,
    isValid: boolean,
    userId: string
  ): Promise<void>;

  abstract getCartsByUserId(userId: string): Promise<CartEntity[]>;

  abstract addCart(payload: IPostCartPayload, userId: string): Promise<void>;
}
