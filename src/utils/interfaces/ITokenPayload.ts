import { ROLE } from "@prisma/client";

export interface ITokenPayload {
  readonly username: string;
  readonly userId: string;
  readonly role: ROLE;
}
