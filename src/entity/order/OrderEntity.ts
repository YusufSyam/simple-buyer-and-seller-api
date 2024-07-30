import { PAYMENT_STATUS } from "@prisma/client";
import { CartEntity } from "../cart/CartEntity";
import { BuyerEntity } from "../user/buyer/BuyerEntity";

export class OrderEntity {
  private _id?: string | undefined;
  private _description?: string | undefined;
  private _status?: PAYMENT_STATUS | undefined;
  private _orderStatusUpdated?: number | undefined;
  private _carts?: CartEntity[] | undefined;
  private _cartIds?: string[] | undefined;
  private _buyer?: BuyerEntity | undefined;
  private _buyerId?: string | undefined;

  constructor(args: {
    id?: string;
    description?: string;
    status?: PAYMENT_STATUS;
    orderStatusUpdated?: number;
    carts?: CartEntity[];
    cartIds?: string[];
    buyer?: BuyerEntity;
    buyerId?: string;
  }) {
    this.id = args.id;
    this.description = args.description;
    this.status = args.status;
    this.orderStatusUpdated = args.orderStatusUpdated;
    this.carts = args.carts;
    this.cartIds = args.cartIds;
    this.buyer = args.buyer;
    this.buyerId = args.buyerId;
  }

  public get buyer(): BuyerEntity | undefined {
    return this._buyer;
  }
  public set buyer(value: BuyerEntity | undefined) {
    this._buyer = value;
  }

  public get buyerId(): string | undefined {
    return this._buyerId;
  }
  public set buyerId(value: string | undefined) {
    this._buyerId = value;
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

  public get status(): PAYMENT_STATUS | undefined {
    return this._status;
  }
  public set status(value: PAYMENT_STATUS | undefined) {
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
