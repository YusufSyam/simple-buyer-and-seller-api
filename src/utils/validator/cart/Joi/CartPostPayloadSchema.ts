import Joi from "joi";

export const CartPostPayloadSchema = Joi.object({
  itemId: Joi.string().required(),
  quantity: Joi.number().required().min(1),
});
