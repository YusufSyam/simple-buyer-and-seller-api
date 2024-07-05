import { ROLE } from "@prisma/client";
import { UserEntity } from "../../../entity/user/UserEntity";

interface IUserCredentialDTO {
  username: string;
  userId: string;
  role: ROLE;
}

export const userCredentialDTO = (user: UserEntity) => {
  return {
    userId: user.id,
    username: user.name,
    role: user.role,
  } as IUserCredentialDTO;
};
