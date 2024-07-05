import { ROLE } from "@prisma/client";

export class UserEntity {
  private _name!: string;
  private _password?: string | undefined;
  private _id?: string | undefined;
  private _role!: ROLE;

  constructor(
    name: string,
    role: ROLE,
    args?: { password?: string; id?: string }
  ) {
    this.id = args?.id;
    this.name = name;
    this.password = args?.password;
    this.role = role;
  }

  public get role(): ROLE {
    return this._role;
  }
  public set role(value: ROLE) {
    this._role = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get password(): string | undefined {
    return this._password;
  }

  public set password(value: string | undefined) {
    this._password = value;
  }

  public get id(): string | undefined {
    return this._id;
  }

  public set id(value: string | undefined) {
    this._id = value;
  }
}
