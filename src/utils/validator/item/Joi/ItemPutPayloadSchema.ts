import Joi from "joi";

export const ItemPutPayloadSchema = Joi.object({
  name: Joi.string().optional(),
  stock: Joi.number().optional().min(0),
  description: Joi.string().optional(),
  thumbnail: Joi.string().optional(),
  price: Joi.number().optional().min(0),
  category: Joi.string().optional(),
});
