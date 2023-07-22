import Joi from 'joi'

export const ReviewSchema = Joi.object().keys({
  rating: Joi.number().label('Rating').required().messages({
    "any.required": "{#label} is required",
    "number.empty": "{#label} should not be empty",
  }),
  comment: Joi.string().label('Comment')
})