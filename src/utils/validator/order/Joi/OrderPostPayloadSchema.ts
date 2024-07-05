import Joi from "joi";

export const OrderPostPayloadSchema = Joi.object({
  description: Joi.string().optional(),
  carts: Joi.array().items(Joi.string()).min(1).required(),
});
