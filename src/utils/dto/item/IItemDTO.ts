import { Category } from "@prisma/client";
import { ItemEntity } from "../../../entity/item/ItemEntity";
import { constants } from "../..";

interface IItemDTO {
  name: string;
  stock: number;
  thumbnail: string;
  description: string;
  totalItem: number;
  itemId: string;
  price: number;
  category: Category;
  author: {
    id: string;
    username: string;
    phoneNumber: string;
  };
}

export const ItemDTO = (item: ItemEntity) => {
  const thumbnailPath = item.thumbnail?.split("/");
  const thumbnail =
    thumbnailPath?.at(0) === "media"
      ? constants.FILE_PATH(thumbnailPath.at(-1) ?? "")
      : item.thumbnail;

  return {
    name: item.name,
    description: item.description,
    stock: item.stock,
    totalItem: item.totalItem,
    itemId: item.id,
    category: item.category,
    price: item.price,
    author: {
      id: item.author?.id,
      username: item.author?.name,
      phoneNumber: item.author?.phoneNumber,
    },
    thumbnail,
  } as IItemDTO;
};
