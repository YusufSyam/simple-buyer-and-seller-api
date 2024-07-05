import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { CartHandler } from "./CartHandler";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { IPostCartPayload } from "../../../utils/interfaces/request/IPostCartPayload";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { CartPostPayloadSchema } from "../../../utils/validator/cart/Joi/CartPostPayloadSchema";
import { CartService } from "../../../services/cart/CartService";
import { OrderStatusPutPayloadSchema } from "../../../utils/validator/order/Joi/OrderStatusPutPayloadSchema";
import { CartDTO } from "../../../utils/dto/cart/ICartDTO";

export class CartHandlerImpl extends CartHandler {
  private cartService: CartService;
  private schemaValidator: SchemaValidator;

  constructor(
    service: {
      cartService: CartService;
    },
    validator: { schemaValidator: SchemaValidator }
  ) {
    super();
    this.cartService = service.cartService;
    this.schemaValidator = validator.schemaValidator;
  }

  async getCart(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;
    const { userId } = getTokenPayload(res);

    try {
      const cart = await this.cartService.getCartById(id, userId);

      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, CartDTO(cart)));
    } catch (error) {
      return next(error);
    }
  }

  async deleteCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { userId } = getTokenPayload(res);
    const { id } = req.params;

    try {
      await this.cartService.deleteCartById(id, userId);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "delete cart successfully")
        );
    } catch (error) {
      return next(error);
    }
  }

  async putCartOrderStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { userId } = getTokenPayload(res);
    const { id } = req.params;
    const payload: { isValid: boolean } = req.body;

    try {
      this.schemaValidator.validate({
        schema: OrderStatusPutPayloadSchema,
        payload,
      });

      await this.cartService.updateCartOrderStatusById(
        id,
        payload.isValid,
        userId
      );

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "update order status successfully"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async postCart(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const payload: IPostCartPayload = req.body;
    const { userId } = getTokenPayload(res);

    try {
      this.schemaValidator.validate({
        schema: CartPostPayloadSchema,
        payload,
      });

      await this.cartService.addCart(payload, userId);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully add item to cart"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
