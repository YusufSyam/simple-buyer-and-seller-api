import { CartEntity } from "../cart/CartEntity";

export class OrderEntity {
  private _id?: string | undefined;
  private _description?: string | undefined;
  private _status?: boolean | undefined;
  private _orderStatusUpdated?: number | undefined;
  private _carts?: CartEntity[] | undefined;
  private _cartIds?: string[] | undefined;

  constructor(args: {
    id?: string;
    description?: string;
    status?: boolean;
    orderStatusUpdated?: number;
    carts?: CartEntity[];
    cartIds?: string[];
  }) {
    this.id = args.id;
    this.description = args.description;
    this.status = args.status;
    this.orderStatusUpdated = args.orderStatusUpdated;
    this.carts = args.carts;
    this.cartIds = args.cartIds;
  }

  public get cartIds(): string[] | undefined {
    return this._cartIds;
  }
  public set cartIds(value: string[] | undefined) {
    this._cartIds = value;
  }

  public get carts(): CartEntity[] | undefined {
    return this._carts;
  }
  public set carts(value: CartEntity[] | undefined) {
    this._carts = value;
  }

  public get orderStatusUpdated(): number | undefined {
    return this._orderStatusUpdated;
  }
  public set orderStatusUpdated(value: number | undefined) {
    this._orderStatusUpdated = value;
  }

  public get status(): boolean | undefined {
    return this._status;
  }
  public set status(value: boolean | undefined) {
    this._status = value;
  }

  public get description(): string | undefined {
    return this._description;
  }
  public set description(value: string | undefined) {
    this._description = value;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
}
