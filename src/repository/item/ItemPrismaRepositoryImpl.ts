import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ItemRepository } from "./ItemRepository";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { constants, ERRORCODE } from "../../utils";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { ItemEntity } from "../../entity/item/ItemEntity";
import { IPutItemPayload } from "../../utils/interfaces/request/IPutItemPayload";
import { SellerEntity } from "../../entity/user/seller/SellerEntity";

export class ItemPrismaRepositoryImpl extends ItemRepository {
  async getItemsNoPagination(): Promise<ItemEntity[]> {
    const items = await prismaDb.db?.item.findMany({});

    return (
      items?.map((i) => {
        return new ItemEntity(i.name ?? "", {
          description: i.description ?? "",
          id: i.id,
          stock: i.stock,
          thumbnail: i.thumbnail ?? "",
          totalItem: i.totalItem,
          category: i.category,
          price: Number(i.price),
        });
      }) ?? []
    );
  }

  async updateItemById(
    itemId: string,
    payload: IPutItemPayload
  ): Promise<void> {
    try {
      await prismaDb.db?.item.update({
        where: {
          id: itemId,
        },
        data: {
          description: payload.description,
          name: payload.name,
          stock: payload.stock,
          thumbnail: payload.thumbnail,
          totalItem: payload.stock,
          price: payload.price,
          category: payload.category,
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

  async deleteItemById(itemId: string): Promise<void> {
    try {
      await prismaDb.db?.item.delete({
        where: {
          id: itemId,
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

  async getItemById(itemId: string): Promise<ItemEntity | null> {
    const item = await prismaDb.db?.item.findFirst({
      where: { id: itemId },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!item) {
      return null;
    }

    return new ItemEntity(item.name ?? "", {
      description: item.description ?? "",
      id: item.id,
      stock: item.stock,
      thumbnail: item.thumbnail ?? "",
      totalItem: item.totalItem,
      authorId: item.authorId,
      category: item.category,
      price: Number(item.price),
      author: new SellerEntity(item.author.username, { id: item.author.id }),
    });
  }

  async getItems(
    page: number,
    search?: string | undefined
  ): Promise<ItemEntity[]> {
    const items = await prismaDb.db?.item.findMany({
      skip: (page - 1) * constants.PAGINATION_OFFSET,
      take: constants.PAGINATION_OFFSET,
      where: {
        name: {
          contains: search,
        },
      },
    });

    return (
      items?.map((i) => {
        return new ItemEntity(i.name ?? "", {
          description: i.description ?? "",
          id: i.id,
          stock: i.stock,
          thumbnail: i.thumbnail ?? "",
          totalItem: i.totalItem,
        });
      }) ?? []
    );
  }

  async addNewItem(newItem: ItemEntity): Promise<void> {
    try {
      await prismaDb.db?.item.create({
        data: {
          stock: newItem.stock ?? 0,
          description: newItem.description ?? "",
          name: newItem.name,
          thumbnail: newItem.thumbnail,
          totalItem: newItem.totalItem ?? 0,
          authorId: newItem.authorId!,
          category: newItem.category,
          price: newItem.price,
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
