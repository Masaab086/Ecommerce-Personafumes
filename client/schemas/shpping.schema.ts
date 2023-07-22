import Joi from "joi";


export const ShippingSchema = Joi.object().keys({
  shippingTypeId: Joi.string().label("Shipping Id").optional().allow(""),
  country: Joi.string().label('Country').required().messages({
    "any.required": "{#label} is required",
    "number.empty": "{#label} should not be empty",
  }),
  state: Joi.string().label('State').required().messages({
    "any.required": "{#label} is required",
    "number.empty": "{#label} should not be empty",
  }),
  shippingType: Joi.string().label('Shipping Type').required().messages({
    "any.required": "{#label} is required",
    "number.empty": "{#label} should not be empty",
  }),
  domesticRate: Joi.number().label('Domestic Rate').required().messages({
    "any.required": "{#label} is required",
    "number.empty": "{#label} should not be empty",
  }),
  internationalRate: Joi.number().label('International Rate').required().messages({
    "any.required": "{#label} is required",
    "number.empty": "{#label} should not be empty",
  })
})
