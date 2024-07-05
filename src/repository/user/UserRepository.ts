import { UserEntity } from "../../entity/user/UserEntity";

export abstract class UserRepository {
  // abstract deleteUserById(userId: string): Promise<void>;

  abstract getUserById(userId: string): Promise<UserEntity | null>;

  // abstract getAllUsers(): Promise<UserEntity[]>;

  abstract addUser(newUser: UserEntity): Promise<void>;

  abstract getUserByUsername(username: string): Promise<UserEntity | null>;
}
