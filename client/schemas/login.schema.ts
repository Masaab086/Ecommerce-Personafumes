import Joi from 'joi'

export const LoginSchema = Joi.object().keys({
  userEmail: Joi.string()
    .label('Email')
    .required()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .messages({
      "any.required": "{#label} is required",
      "string.base": "{#label} should be a string",
      "string.empty": "{#label} should not be empty",
    }),
  userPassword: Joi.string()
    .label('Password')
    .required()
    .min(8)
    .messages({
      "any.required": "{#label} is required",
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "string.min": "{#label} must contain at least 8 characters",
    })
})

export const ResetPasswordSchema = Joi.object().keys({
  password: Joi.string().label("Password").required().min(8).messages({
    "any.required": "{#label} is required",
    "string.base": "{#label} should be a string",
    "string.empty": "{#label} should not be empty",
    "string.min": "{#label} must contain at least 8 characters",
  }),
  confirmPassword: Joi.required()
    .label("Confirm Password")
    .valid(Joi.ref("password"))
    .messages({
      "any.required": "{#label} is required",
      "any.only": "Passwords do not match",
      "string.empty": "{#label} should not be empty",
    }),
})

export const ForgetPasswordSchema = Joi.object().keys({
  email: Joi.string()
    .label('Email')
    .required()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .messages({
      "any.required": "{#label} is required",
      "string.base": "{#label} should be a string",
      "string.empty": "{#label} should not be empty",
    }),
})
