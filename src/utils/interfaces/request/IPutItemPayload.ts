import { Category } from "@prisma/client";

export interface IPutItemPayload {
  readonly name?: string;
  readonly description?: string;
  readonly stock?: number;
  readonly thumbnail?: string;
  readonly price?: number;
  readonly category?: Category;
}
