import { Request, Response, NextFunction } from "express";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { ItemHandler } from "./ItemHandler";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ItemService } from "../../../services/item/ItemService";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { IPostItemPayload } from "../../../utils/interfaces/request/IPostItemPayload";
import { ItemPostPayloadSchema } from "../../../utils/validator/item/Joi/ItemPostPayloadSchema";
import { ItemDTO } from "../../../utils/dto/item/IItemDTO";
import { IPutItemPayload } from "../../../utils/interfaces/request/IPutItemPayload";
import { ItemPutPayloadSchema } from "../../../utils/validator/item/Joi/ItemPutPayloadSchema";
import { ITokenPayload } from "../../../utils/interfaces/ITokenPayload";

export class ItemHandlerImpl extends ItemHandler {
  private itemService: ItemService;
  private schemaValidator: SchemaValidator;

  constructor(
    service: {
      itemService: ItemService;
    },
    validator: { schemaValidator: SchemaValidator }
  ) {
    super();
    this.itemService = service.itemService;
    this.schemaValidator = validator.schemaValidator;
  }

  async getItem(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { itemId } = req.params;

    try {
      const item = await this.itemService.getItemById(itemId);

      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, ItemDTO(item)));
    } catch (error) {
      return next(error);
    }
  }

  async putItem(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { itemId } = req.params;
    const payload: IPutItemPayload = req.body;
    const { userId } = getTokenPayload(res);

    try {
      this.schemaValidator.validate({
        schema: ItemPutPayloadSchema,
        payload,
      });

      await this.itemService.updateItemById(itemId, payload, userId);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully update an item"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async deleteItem(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { itemId } = req.params;
    const { userId } = getTokenPayload(res);

    try {
      await this.itemService.deleteItemById(itemId, userId);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully delete an item"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getItems(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { page, s } = req.query;

    const items = await this.itemService.getItemsNoPagination();

    return res
      .status(200)
      .json(createResponse(RESPONSE_MESSAGE.SUCCESS, items.map(ItemDTO)));
  }

  async postItem(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { userId } = getTokenPayload(res);
    const payload: IPostItemPayload = req.body;

    try {
      this.schemaValidator.validate({
        schema: ItemPostPayloadSchema,
        payload,
      });

      await this.itemService.addNewItem(payload, userId);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully add a new item"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
