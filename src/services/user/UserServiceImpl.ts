import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { HashAbstract } from "../../config/crypto/HashAbstract";
import { UserRepository } from "../../repository/user/UserRepository";
import { UserEntity } from "../../entity/user/UserEntity";
import { ERRORCODE } from "../../utils";
import { IPostUserPayload } from "../../utils/interfaces/request/IPostUserPayload";
import { UserService } from "./UserService";

export class UserServiceImpl extends UserService {
  private hashImpl: HashAbstract;

  constructor(
    repository: { userRepository: UserRepository },
    hashImpl: HashAbstract
  ) {
    super(repository);
    this.hashImpl = hashImpl;
  }

  // async deleteUserById(userId: string): Promise<void> {
  //   const user = await this.userRepository.getUserById(userId);

  //   if (!user) {
  //     throw new NotFoundError(
  //       ERRORCODE.USER_NOT_FOUND_ERROR,
  //       "user's not found"
  //     );
  //   }

  //   await this.userRepository.deleteUserById(userId);
  // }

  // async getAllUsers(): Promise<UserEntity[]> {
  //   const users = this.userRepository.getAllUsers();

  //   return users;
  // }

  async addNewUser(payload: IPostUserPayload): Promise<void> {
    const password = await this.hashImpl.hash(payload.password);

    const newUser = new UserEntity(payload.username, payload.role, {
      password,
      phoneNumber: payload.phoneNumber,
    });

    await this.userRepository.addUser(newUser);
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      throw new NotFoundError(
        ERRORCODE.USER_NOT_FOUND_ERROR,
        "user's not found"
      );
    }

    return user;
  }
}
