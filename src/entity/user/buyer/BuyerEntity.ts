import { ROLE } from "@prisma/client";
import { UserEntity } from "../UserEntity";
import { CartEntity } from "../../cart/CartEntity";

export class BuyerEntity extends UserEntity {
  private _carts?: CartEntity[] | undefined;

  constructor(
    name: string,
    args?: {
      password?: string;
      id?: string;
      carts?: CartEntity[];
      phoneNumber?: string;
    }
  ) {
    super(name, ROLE.BUYER, {
      password: args?.password,
      id: args?.id,
      phoneNumber: args?.phoneNumber,
    });
    this.carts = args?.carts;
  }

  public get carts(): CartEntity[] | undefined {
    return this._carts;
  }
  public set carts(value: CartEntity[] | undefined) {
    this._carts = value;
  }
}
