import { OrderEntity } from "../../entity/order/OrderEntity";
import { OrderRepository } from "./OrderRepository";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { BuyerEntity } from "../../entity/user/buyer/BuyerEntity";
import { CartEntity } from "../../entity/cart/CartEntity";
import { ItemEntity } from "../../entity/item/ItemEntity";

export class OrderPrismaRepositoryImpl extends OrderRepository {
  async getOrderById(id: string): Promise<OrderEntity | null> {
    const order = await prismaDb.db?.order.findUnique({
      where: { id },
      include: {
        buyer: {
          select: {
            id: true,
            phoneNumber: true,
            username: true,
          },
        },
        carts: {
          select: {
            id: true,
            item: { select: { name: true, id: true } },
            quantity: true,
          },
        },
      },
    });

    if (!order) return null;

    return new OrderEntity({
      buyerId: order.buyerId,
      description: order.desription ?? "",
      id: order.id,
      orderStatusUpdated: Number(order.orderStatusUpdated),
      status: order.status,
      buyer: new BuyerEntity(order.buyer.username, { id: order.buyer.id }),
      carts: order.carts.map((c) => {
        return new CartEntity({
          id: c.id,
          quantity: c.quantity,
          item: new ItemEntity(c.item.name!, { id: c.item.id }),
        });
      }),
    });
  }

  async getOrders(): Promise<OrderEntity[]> {
    const orders = await prismaDb.db?.order.findMany({
      include: {
        buyer: {
          select: {
            id: true,
            phoneNumber: true,
            username: true,
          },
        },
        carts: {
          select: {
            id: true,
            item: { select: { name: true } },
            quantity: true,
          },
        },
      },
    });

    return (
      orders?.map((o) => {
        return new OrderEntity({
          buyerId: o.buyerId,
          description: o.desription ?? "",
          id: o.id,
          orderStatusUpdated: Number(o.orderStatusUpdated),
          status: o.status,
          buyer: new BuyerEntity(o.buyer.username, { id: o.buyer.id }),
          carts: o.carts.map((c) => {
            return new CartEntity({
              id: c.id,
              quantity: c.quantity,
              item: new ItemEntity(c.item.name!),
            });
          }),
        });
      }) ?? []
    );
  }

  async getOrdersByBuyerId(userId: string): Promise<OrderEntity[]> {
    const orders = await prismaDb.db?.order.findMany({
      where: { buyerId: userId },
      include: {
        buyer: {
          select: {
            id: true,
            phoneNumber: true,
            username: true,
          },
        },
        carts: {
          select: {
            id: true,
            item: { select: { name: true } },
            quantity: true,
          },
        },
      },
    });

    return (
      orders?.map((o) => {
        return new OrderEntity({
          buyerId: o.buyerId,
          description: o.desription ?? "",
          id: o.id,
          orderStatusUpdated: Number(o.orderStatusUpdated),
          status: o.status,
          buyer: new BuyerEntity(o.buyer.username, { id: o.buyer.id }),
          carts: o.carts.map((c) => {
            return new CartEntity({
              id: c.id,
              quantity: c.quantity,
              item: new ItemEntity(c.item.name!),
            });
          }),
        });
      }) ?? []
    );
  }

  async insertOrder(order: OrderEntity): Promise<void> {
    // try {
    //   await prismaDb.db?.order.create({
    //     data: {
    //       desription: order.description,
    //       orderStatusUpdated: order.orderStatusUpdated,
    //       carts: {
    //         connect: order.cartIds?.map((c) => ({ id: c })),
    //       },
    //     },
    //   });
    // } catch (error) {
    //   if (error instanceof PrismaClientKnownRequestError) {
    //     throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
    //   } else if (error instanceof Error) {
    //     throw new InternalServerError(error.message);
    //   }
    // }
  }
}
