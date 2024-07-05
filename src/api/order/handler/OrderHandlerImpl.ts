import { Request, Response, NextFunction } from "express";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { OrderHandler } from "./OrderHandler";
import { OrderService } from "../../../services/order/OrderService";
import { IPostOrderPayload } from "../../../utils/interfaces/request/IPostOrderPayload";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { OrderPostPayloadSchema } from "../../../utils/validator/order/Joi/OrderPostPayloadSchema";
import { OrderStatusPutPayloadSchema } from "../../../utils/validator/order/Joi/OrderStatusPutPayloadSchema";

export class OrderHandlerImpl extends OrderHandler {
  private orderService: OrderService;
  private schemaValidator: SchemaValidator;

  constructor(
    service: { orderService: OrderService },
    validator: { schemaValidator: SchemaValidator }
  ) {
    super();
    this.orderService = service.orderService;
    this.schemaValidator = validator.schemaValidator;
  }

  async putOrderStatus(
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

      await this.orderService.updateOrderStatusById(
        id,
        payload.isValid,
        userId
      );

      return res
        .status(201)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "update order status successfully")
        );
    } catch (error) {
      return next(error);
    }
  }

  async postOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const payload: IPostOrderPayload = req.body;
    const { userId } = getTokenPayload(res);

    try {
      this.schemaValidator.validate({
        schema: OrderPostPayloadSchema,
        payload,
      });

      await this.orderService.addOrder(payload, userId);

      return res
        .status(201)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "add order successfully")
        );
    } catch (error) {
      return next(error);
    }
  }
}
