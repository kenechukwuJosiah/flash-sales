import * as Joi from 'joi';
import mongoose from 'mongoose';

export const productValidator = Joi.object({
  name: Joi.string().required(),
  totalUnits: Joi.number().integer().default(200),
  availableUnits: Joi.number().integer().default(200),
  saleStartTime: Joi.date().required(),
  saleEndTime: Joi.date(),
});


export const purchaseValidator = Joi.object({
  productId: Joi.string().custom((value, helpers) => {
    if (mongoose.Types.ObjectId.isValid(value)) {
      return value;
    }
    return helpers.error('any.custom', { value });
  }).messages({
    'any.custom': 'Invalid ObjectId',
  }).required(),
  quantity: Joi.number().integer().min(1).max(20).required(),
});
