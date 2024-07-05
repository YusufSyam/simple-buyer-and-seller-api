import { ROLE } from "@prisma/client";

export interface IPostUserPayload {
  readonly username: string;
  readonly password: string;
  readonly role: ROLE;
}
