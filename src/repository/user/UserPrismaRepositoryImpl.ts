import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserEntity } from "../../entity/user/UserEntity";
import { UserRepository } from "./UserRepository";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { ERRORCODE } from "../../utils";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";

export class UserPrismaRepositoryImpl extends UserRepository {
  // async deleteUserById(userId: string): Promise<void> {
  //   try {
  //     await prismaDb.db?.user.delete({
  //       where: {
  //         id: userId,
  //       },
  //     });
  //   } catch (error) {
  //     if (error instanceof PrismaClientKnownRequestError) {
  //       throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
  //     } else if (error instanceof Error) {
  //       throw new InternalServerError(error.message);
  //     }
  //   }
  // }

  async addUser(newUser: UserEntity): Promise<void> {
    try {
      await prismaDb.db?.user.create({
        data: {
          password: newUser.password ?? "",
          username: newUser.name,
          role: newUser.role,
          phoneNumber: newUser.phoneNumber,
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

  // async getAllUsers(): Promise<UserEntity[]> {
  //   const users = await prismaDb.db?.user.findMany();

  //   return (
  //     users?.map((u) => {
  //       return new UserEntity(u.username, u.role, {
  //         password: u.password,
  //         id: u.id,
  //       });
  //     }) ?? []
  //   );
  // }

  async getUserById(userId: string): Promise<UserEntity | null> {
    const user = await prismaDb.db?.user.findUnique({ where: { id: userId } });

    if (!user) {
      return null;
    }

    return new UserEntity(user.username, user.role, {
      password: user.password,
      id: user.id,
      phoneNumber: user.phoneNumber ?? "",
    });
  }

  async getUserByUsername(username: string): Promise<UserEntity | null> {
    const user = await prismaDb.db?.user.findUnique({ where: { username } });

    if (!user) {
      return null;
    }

    return new UserEntity(user.username, user.role, {
      password: user.password,
      id: user.id,
      phoneNumber: user.phoneNumber ?? "",
    });
  }
}
