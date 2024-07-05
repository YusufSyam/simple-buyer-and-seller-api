import { Category } from "@prisma/client";

export interface IPostItemPayload {
  readonly name: string;
  readonly description?: string;
  readonly stock: number;
  readonly thumbnail?: string;
  readonly category: Category;
  readonly price: number;
}
