import Joi from "joi";

export const ItemPostPayloadSchema = Joi.object({
  name: Joi.string().required(),
  stock: Joi.number().required().min(0),
  description: Joi.string().optional(),
  thumbnail: Joi.string().optional(),
  price: Joi.number().required().min(0),
  category: Joi.string().required(),
});
