import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderEntity } from "../../entity/order/OrderEntity";
import { OrderRepository } from "./OrderRepository";
import { ERRORCODE } from "../../utils";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";

export class OrderPrismaRepositoryImpl extends OrderRepository {
  async insertOrder(order: OrderEntity): Promise<void> {
    try {
      await prismaDb.db?.order.create({
        data: {
          desription: order.description,
          orderStatusUpdated: order.orderStatusUpdated,
          carts: {
            connect: order.cartIds?.map((c) => ({ id: c })),
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }
}
