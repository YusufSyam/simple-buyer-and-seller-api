import { ItemEntity } from "../../entity/item/ItemEntity";
import { IPutItemPayload } from "../../utils/interfaces/request/IPutItemPayload";

export abstract class ItemRepository {
  abstract getItemsNoPagination(): ItemEntity[] | PromiseLike<ItemEntity[]>;

  abstract updateItemById(
    itemId: string,
    payload: IPutItemPayload
  ): Promise<void>;

  abstract deleteItemById(itemId: string): Promise<void>;

  abstract getItemById(itemId: string): Promise<ItemEntity | null>;

  abstract getItems(
    page: number,
    search: string | undefined
  ): ItemEntity[] | PromiseLike<ItemEntity[]>;

  abstract addNewItem(newItem: ItemEntity): Promise<void>;
}
