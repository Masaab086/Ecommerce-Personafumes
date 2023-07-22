import Joi from 'joi'

export const AddCouponSchema = Joi.object().keys({
  campaignName: Joi.string().label('Campaign Name').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  code: Joi.string().label('Campaign Code').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  startDate: Joi.date().label('Coupon Start Date').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  endDate: Joi.date().label('Coupon End Date').required().min(Joi.ref("startDate")).messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  discount: Joi.number().label('Discount Percentage').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  minAmount: Joi.number().label('Minimum Amount').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),

})