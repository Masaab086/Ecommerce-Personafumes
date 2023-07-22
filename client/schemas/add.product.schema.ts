import Joi from 'joi'

export const AddProductSchema = Joi.object().keys({
  bottleName: Joi.string().label('Bottle Name').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  categoryType: Joi.string().label('Gender').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  description: Joi.string().label('Description').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  availableQuantity: Joi.number().label('Available Quantity').required().messages({
    "any.required": "{#label} is required",
    "number.empty": "{#label} should not be empty",
  }),
  capacity: Joi.number().label("Capacity").required().messages({
    "any.required": "{#label} is required",
    "number.empty": "{#label} should not be empty",
  }),
  price: Joi.number().label('Price').required().messages({
    "any.required": "{#label} is required",
    "number.empty": "{#label} should not be empty",
  }),
  variants: Joi.array().items(Joi.object().keys({
    variantType: Joi.string().required().label('Variant Type').messages({
      "any.required": "{#label} is required",
      "string.empty": "{#label} should not be empty"
    }),
    variantName: Joi.string().required().label('Variant Name').messages({
      "any.required": "{#label} is required",
      "string.empty": "{#label} should not be empty"
    }),
    frontImage: Joi.string().required().label('Front Image').messages({
      "any.required": "{#label} is required",
      "string.empty": "{#label} should not be empty"
    }),
    backImage: Joi.string().required().label('Back Image').messages({
      "any.required": "{#label} is required",
      "string.empty": "{#label} should not be empty"
    }),

  })),
  personalizable: Joi.boolean().label('Personalizable')
})

export const UpdateProductSchema = Joi.object().keys({
  bottleName: Joi.string().label('Bottle Name').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  categoryType: Joi.string().label('Gender').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  description: Joi.string().label('Description').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  availableQuantity: Joi.number().label('Available Quantity').required().messages({
    "any.required": "{#label} is required",
    "number.empty": "{#label} should not be empty",
  }),
  capacity: Joi.number().label("Capacity").required().messages({
    "any.required": "{#label} is required",
    "number.empty": "{#label} should not be empty",
  }),
  price: Joi.number().label('Price').required().messages({
    "any.required": "{#label} is required",
    "number.empty": "{#label} should not be empty",
  }),
  variants: Joi.array().items(Joi.object().keys({
    variantId: Joi.string().label('Variant ID').allow('').optional(),
    bottleId: Joi.string().label('Bottle ID').allow('').optional(),
    variantType: Joi.string().required().label('Variant Type').messages({
      "any.required": "{#label} is required",
      "string.empty": "{#label} should not be empty"
    }),
    variantName: Joi.string().required().label('Variant Name').messages({
      "any.required": "{#label} is required",
      "string.empty": "{#label} should not be empty"
    }),
    frontImage: Joi.string().required().label('Front Image').messages({
      "any.required": "{#label} is required",
      "string.empty": "{#label} should not be empty"
    }),
    backImage: Joi.string().required().label('Back Image').messages({
      "any.required": "{#label} is required",
      "string.empty": "{#label} should not be empty"
    }),

  })),
  personalizable: Joi.boolean().label('Personalizable')
})

export const AddFragranceSchema = Joi.object().keys({
  fragranceName: Joi.string().label('Fragrance Name').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  inspiration: Joi.string().label('inspiration').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  gender: Joi.string().label('Gender').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  target: Joi.string().label('Target').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  availableUnites: Joi.number().label('Available Unites').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  unitCost: Joi.number().label('Unit Cost').required().required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  unitOfMeasure: Joi.string().label('Unit of Measure').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
})