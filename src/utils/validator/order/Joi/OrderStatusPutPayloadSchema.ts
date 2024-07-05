import Joi from "joi";

export const OrderStatusPutPayloadSchema = Joi.object({
  isValid: Joi.boolean().required(),
});
