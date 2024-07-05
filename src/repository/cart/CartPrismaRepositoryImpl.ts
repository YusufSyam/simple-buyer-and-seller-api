import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CartEntity } from "../../entity/cart/CartEntity";
import { CartRepository } from "./CartRepository";
import { ERRORCODE } from "../../utils";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { BuyerEntity } from "../../entity/user/buyer/BuyerEntity";
import { ItemEntity } from "../../entity/item/ItemEntity";
import { SellerEntity } from "../../entity/user/seller/SellerEntity";

export class CartPrismaRepositoryImpl extends CartRepository {
  async deleteCartById(id: string): Promise<void> {
    try {
      await prismaDb.db?.cart.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }

  async getCartsByItemAuthorId(userId: string): Promise<CartEntity[]> {
    const carts = await prismaDb.db?.cart.findMany({
      where: {
        item: {
          authorId: userId,
        },
      },
      include: {
        buyer: { select: { id: true, username: true } },
        item: {
          select: {
            id: true,
            category: true,
            name: true,
            price: true,
            thumbnail: true,
            author: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    return (
      carts?.map((c) => {
        return new CartEntity({
          id: c.id,
          buyerId: c.buyerId,
          itemId: c.itemId,
          quantity: c.quantity,
          buyer: new BuyerEntity(c.buyer.username, { id: c.buyer.id }),
          item: new ItemEntity(c.item.name!, {
            category: c.item.category,
            id: c.itemId,
            price: Number(c.item.price),
            thumbnail: c.item.thumbnail ?? "",
            author: new SellerEntity(c.item.author.username),
          }),
          status: c.status,
          orderStatusUpdated: Number(c.orderStatusUpdated),
        });
      }) ?? []
    );
  }

  async getCartById(id: string): Promise<CartEntity | null> {
    const cart = await prismaDb.db?.cart.findUnique({
      where: {
        id,
      },
      include: {
        buyer: {
          select: {
            id: true,
            username: true,
          },
        },
        item: {
          select: {
            name: true,
            price: true,
            category: true,
            thumbnail: true,
            author: {
              select: { username: true, id: true },
            },
          },
        },
      },
    });

    if (!cart) {
      return null;
    }

    return new CartEntity({
      id: cart?.id,
      buyerId: cart?.buyerId,
      itemId: cart?.itemId,
      quantity: cart?.quantity,
      item: new ItemEntity(cart?.item.name!, {
        price: Number(cart?.item.price),
        category: cart?.item.category,
        thumbnail: cart?.item.thumbnail ?? "",
        author: new SellerEntity(cart?.item.author.username!, {
          id: cart.item.author.id,
        }),
      }),
      buyer: new BuyerEntity(cart?.buyer?.username!, { id: cart?.buyer.id }),
      status: cart.status,
      orderStatusUpdated: Number(cart.orderStatusUpdated),
    });
  }

  async getCartsByUserId(userId: string): Promise<CartEntity[]> {
    const carts = await prismaDb.db?.cart.findMany({
      where: {
        buyerId: userId,
      },
      include: {
        buyer: { select: { id: true, username: true } },
        item: {
          select: {
            id: true,
            category: true,
            name: true,
            price: true,
            thumbnail: true,
            author: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    return (
      carts?.map((c) => {
        return new CartEntity({
          id: c.id,
          buyerId: c.buyerId,
          itemId: c.itemId,
          quantity: c.quantity,
          buyer: new BuyerEntity(c.buyer.username, { id: c.buyer.id }),
          item: new ItemEntity(c.item.name!, {
            category: c.item.category,
            id: c.itemId,
            price: Number(c.item.price),
            thumbnail: c.item.thumbnail ?? "",
            author: new SellerEntity(c.item.author.username),
          }),
          status: c.status,
          orderStatusUpdated: Number(c.orderStatusUpdated),
        });
      }) ?? []
    );
  }

  async addCart(cart: CartEntity): Promise<void> {
    try {
      await prismaDb.db?.cart.create({
        data: {
          quantity: cart.quantity!,
          buyerId: cart.buyerId!,
          itemId: cart.itemId!,
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
