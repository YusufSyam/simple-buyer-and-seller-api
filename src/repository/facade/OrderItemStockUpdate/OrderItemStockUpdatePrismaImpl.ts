import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderEntity } from "../../../entity/order/OrderEntity";
import { OrderItemStockUpdate } from "./OrderItemStockUpdate";
import { BadRequestError } from "../../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../../Exceptions/http/InternalServerError";
import { ERRORCODE } from "../../../utils";
import { prismaDb } from "../../../config/database/PrismaORMDBConfig";

export class OrderItemStockUpdatePrismaImpl extends OrderItemStockUpdate {
  async insertOrderAndUpdateItemStock(order: OrderEntity): Promise<void> {
    try {
      const transactions: any[] = [];

      order.cartIds?.forEach(async (id) => {
        const cart = await this.cartRepository.getCartById(id);

        transactions.push(
          await prismaDb.db?.item.update({
            where: {
              id: cart?.itemId,
            },
            data: {
              stock: {
                decrement: cart?.quantity,
              },
            },
          })
        );
      });

      await prismaDb.db?.$transaction([
        prismaDb.db?.order.create({
          data: {
            desription: order.description,
            orderStatusUpdated: order.orderStatusUpdated,
            carts: {
              connect: order.cartIds?.map((c) => ({ id: c })),
            },
          },
        }),
        ...transactions,
      ]);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }
}
