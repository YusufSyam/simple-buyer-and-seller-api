import Joi from "joi";

export const UserPostPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().required().min(10),
  role: Joi.string().required(),
});
