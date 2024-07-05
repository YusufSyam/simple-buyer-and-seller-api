import { PAYMENT_STATUS } from "@prisma/client";
import { ItemEntity } from "../item/ItemEntity";
import { OrderEntity } from "../order/OrderEntity";
import { BuyerEntity } from "../user/buyer/BuyerEntity";

export class CartEntity {
  private _id?: string | undefined;
  private _quantity?: number | undefined;
  private _item?: ItemEntity | undefined;
  private _itemId?: string | undefined;
  private _buyer?: BuyerEntity | undefined;
  private _buyerId?: string | undefined;
  private _order?: OrderEntity | undefined;
  private _orderId?: string | undefined;
  private _status?: PAYMENT_STATUS | undefined;
  private _orderStatusUpdated?: number | undefined;

  constructor(args: {
    id?: string;
    quantity?: number;
    item?: ItemEntity;
    itemId?: string;
    buyer?: BuyerEntity;
    buyerId?: string;
    status?: PAYMENT_STATUS;
    orderStatusUpdated?: number;
  }) {
    this.id = args.id;
    this.quantity = args.quantity;
    this.item = args.item;
    this.itemId = args.itemId;
    this.buyer = args.buyer;
    this.buyerId = args.buyerId;
    this.status = args.status;
    this.orderStatusUpdated = args.orderStatusUpdated;
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

  public get orderId(): string | undefined {
    return this._orderId;
  }
  public set orderId(value: string | undefined) {
    this._orderId = value;
  }

  public get order(): OrderEntity | undefined {
    return this._order;
  }
  public set order(value: OrderEntity | undefined) {
    this._order = value;
  }

  public get buyerId(): string | undefined {
    return this._buyerId;
  }
  public set buyerId(value: string | undefined) {
    this._buyerId = value;
  }

  public get buyer(): BuyerEntity | undefined {
    return this._buyer;
  }
  public set buyer(value: BuyerEntity | undefined) {
    this._buyer = value;
  }

  public get itemId(): string | undefined {
    return this._itemId;
  }
  public set itemId(value: string | undefined) {
    this._itemId = value;
  }

  public get item(): ItemEntity | undefined {
    return this._item;
  }
  public set item(value: ItemEntity | undefined) {
    this._item = value;
  }

  public get quantity(): number | undefined {
    return this._quantity;
  }
  public set quantity(value: number | undefined) {
    this._quantity = value;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
}
