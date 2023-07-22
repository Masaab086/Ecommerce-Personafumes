import Joi from "joi";

export const FeatureSchema = Joi.object().keys({
  heading: Joi.string().label("Heading").optional().allow(""),
  subHeading: Joi.string().label("Sub Heading").optional().allow(""),
  statement: Joi.string().label("Statment").optional().allow(""),
  detail: Joi.string().label("Detail").optional().allow(""),
  mediaPointer: Joi.string().label("Video").optional().allow("")
})

export const AboutSchema = Joi.object().keys({
  heading: Joi.string().label("Heading").optional().allow(""),
  lists: Joi.array().items(Joi.object().keys({
    item: Joi.string().optional().allow(''),
  })),
  detail: Joi.string().label("Detail").optional().allow(""),
  mediaPointer: Joi.string().label("Video").optional().allow("")
})

export const AwardSchema = Joi.object().keys({
  heading: Joi.string().label("Heading").optional().allow(""),
  detail: Joi.string().label("Detail").optional().allow(""),
  mediaPointer: Joi.string().label("Video").optional().allow("")
})