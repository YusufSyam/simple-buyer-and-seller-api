import { ItemEntity } from "../../entity/item/ItemEntity";
import { ItemRepository } from "../../repository/item/ItemRepository";
import { IPostItemPayload } from "../../utils/interfaces/request/IPostItemPayload";
import { IPutItemPayload } from "../../utils/interfaces/request/IPutItemPayload";

export abstract class ItemService {
  protected itemRepository: ItemRepository;

  constructor(repository: { itemRepository: ItemRepository }) {
    this.itemRepository = repository.itemRepository;
  }

  abstract getItemsNoPagination(): Promise<ItemEntity[]>;

  abstract getItemById(itemId: string): Promise<ItemEntity>;

  abstract updateItemById(
    itemId: string,
    payload: IPutItemPayload,
    authorId: string
  ): Promise<void>;

  abstract deleteItemById(itemId: string, authorId: string): Promise<void>;

  abstract getItems(
    page?: number | undefined,
    search?: string | undefined
  ): Promise<ItemEntity[]>;

  abstract addNewItem(
    payload: IPostItemPayload,
    authorId: string
  ): Promise<void>;
}
