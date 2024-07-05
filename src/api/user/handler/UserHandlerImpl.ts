import { Request, Response, NextFunction } from "express";
import { UserHandler } from "./UserHandler";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { UserService } from "../../../services/user/UserService";
import { ITokenPayload } from "../../../utils/interfaces/ITokenPayload";
import { userCredentialDTO } from "../../../utils/dto/user/IUserCredentialDTO";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { UserPostPayloadSchema } from "../../../utils/validator/user/Joi/UserPostPayloadSchema";
import { IPostUserPayload } from "../../../utils/interfaces/request/IPostUserPayload";
import { AuthService } from "../../../services/auth/AuthService";

export class UserHandlerImpl extends UserHandler {
  private authService: AuthService;
  private userService: UserService;

  private schemaValidator: SchemaValidator;

  constructor(
    service: {
      authService: AuthService;
      userService: UserService;
    },
    schemaValidator: SchemaValidator
  ) {
    super();
    this.authService = service.authService;
    this.userService = service.userService;
    this.schemaValidator = schemaValidator;
  }

  // async deleteUserMaster(
  //   req: Request,
  //   res: Response<any, Record<string, any>>,
  //   next: NextFunction
  // ): Promise<any> {
  //   const { userId } = req.params;

  //   try {
  //     await this.userService.deleteUserById(userId);

  //     return res
  //       .status(200)
  //       .json(
  //         createResponse(RESPONSE_MESSAGE.SUCCESS, "successfully delete user")
  //       );
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async getUsersMaster(
  //   req: Request,
  //   res: Response<any, Record<string, any>>,
  //   next: NextFunction
  // ): Promise<any> {
  //   const users = await this.userService.getAllUsers();

  //   return res
  //     .status(200)
  //     .json(
  //       createResponse(RESPONSE_MESSAGE.SUCCESS, users.map(userCredentialDTO))
  //     );
  // }

  async postUser(req: Request, res: Response, next: NextFunction) {
    const payload: IPostUserPayload = req.body;

    try {
      this.schemaValidator.validate({
        schema: UserPostPayloadSchema,
        payload,
      });

      await this.userService.addNewUser(payload);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully register a new user"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async postUserLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.authService.generateToken(getTokenPayload(res));

      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, token));
    } catch (error) {
      return next(error);
    }
  }

  async getUserCredential(req: Request, res: Response, next: NextFunction) {
    const { username } = getTokenPayload(res);

    try {
      const user = await this.userService.getUserByUsername(username);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, userCredentialDTO(user))
        );
    } catch (error) {
      return next(error);
    }
  }
}
