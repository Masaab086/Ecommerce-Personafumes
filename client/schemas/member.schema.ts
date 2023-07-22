import Joi from "joi";

export const AddMemberSchema = Joi.object().keys({
  firstName: Joi.string().label("First Name").max(32).required().messages({
    "any.required": "{#label} is required",
    "string.base": "{#label} should be a string",
    "string.empty": "{#label} should not be empty",
    "string.min": "{#label} contains maximum 32 characters",
  }),
  lastName: Joi.string().label("Last Name").max(32).required().messages({
    "any.required": "{#label} is required",
    "string.base": "{#label} should be a string",
    "string.empty": "{#label} should not be empty",
    "string.min": "{#label} contains maximum 32 characters",
  }),
  userEmail: Joi.string().label('Email').required().trim().lowercase().email({ tlds: { allow: false } })
    .messages({
      "any.required": "{#label} is required",
      "string.base": "{#label} should be a string",
      "string.empty": "{#label} should not be empty",
      "string.email": "{#label} is invalid",
    }),
  userPassword: Joi.string().label("Password").required().min(8).messages({
    "any.required": "{#label} is required",
    "string.base": "{#label} should be a string",
    "string.empty": "{#label} should not be empty",
    "string.min": "{#label} must contain at least 8 characters",
  }),
  confirmPassword: Joi.required()
    .label("Confirm Password")
    .valid(Joi.ref("userPassword"))
    .messages({
      "any.required": "{#label} is required",
      "any.only": "Passwords do not match",
      "string.empty": "{#label} should not be empty",
    }),
  phone: Joi.string().label('Phone Number').min(10).pattern(/^[0-9?+]+$/).required().messages({
    "any.required": "{#label} is required",
    "any.invalid": "{#label} did not seem to be a phone number",
    "string.empty": "{#label} should not be empty",
    "string.pattern.base": "{#label} did not seem to be a phone number"
  }),
  gender: Joi.string().label('gender').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  role: Joi.string().label('Role').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
})

export const UpdateMemberSchema = Joi.object().keys({
  adminId: Joi.string().label("Admin Id").optional().allow(""),
  firstName: Joi.string().label("First Name").max(32).required().messages({
    "any.required": "{#label} is required",
    "string.base": "{#label} should be a string",
    "string.empty": "{#label} should not be empty",
    "string.min": "{#label} contains maximum 32 characters",
  }),
  lastName: Joi.string().label("Last Name").max(32).required().messages({
    "any.required": "{#label} is required",
    "string.base": "{#label} should be a string",
    "string.empty": "{#label} should not be empty",
    "string.min": "{#label} contains maximum 32 characters",
  }),
  userEmail: Joi.string().label('Email').required().trim().lowercase().email({ tlds: { allow: false } })
    .messages({
      "any.required": "{#label} is required",
      "string.base": "{#label} should be a string",
      "string.empty": "{#label} should not be empty",
      "string.email": "{#label} is invalid",
    }),

  phone: Joi.string().label('Phone Number').min(10).pattern(/^[0-9?+]+$/).required().messages({
    "any.required": "{#label} is required",
    "any.invalid": "{#label} did not seem to be a phone number",
    "string.empty": "{#label} should not be empty",
    "string.pattern.base": "{#label} did not seem to be a phone number"
  }),
  gender: Joi.string().label('gender').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  role: Joi.string().label('Role').required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
})