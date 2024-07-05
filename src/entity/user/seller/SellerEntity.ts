import { ROLE } from "@prisma/client";
import { ItemEntity } from "../../item/ItemEntity";
import { UserEntity } from "../UserEntity";

export class SellerEntity extends UserEntity {
  private _items?: ItemEntity[] | undefined;

  constructor(
    name: string,
    args?: { password?: string; id?: string; items?: ItemEntity[] }
  ) {
    super(name, ROLE.SELLER, { password: args?.password, id: args?.id });
    this.items = args?.items;
  }

  public get items(): ItemEntity[] | undefined {
    return this._items;
  }
  public set items(value: ItemEntity[] | undefined) {
    this._items = value;
  }
}
