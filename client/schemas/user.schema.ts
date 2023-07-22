import Joi from "joi";

export const CustomerSchema = Joi.object().keys({
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
  day: Joi.number().label("day").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  month: Joi.number().label("month").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  year: Joi.number().label("year").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  gender: Joi.string().label("gender").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  city: Joi.string().label("City").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  state: Joi.string().label("State / Province").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  zipCode: Joi.string().label("Zip / Postal Code").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  shippingAddress: Joi.string().label("Shipping Address").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
});

export const CustomerSchemaUpdate = Joi.object().keys({
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
  day: Joi.number().label("day").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  month: Joi.number().label("month").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  year: Joi.number().label("year").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  gender: Joi.string().label("gender").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  city: Joi.string().label("City").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  state: Joi.string().label("State / Province").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  zipCode: Joi.string().label("Zip / Postal Code").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  shippingAddress: Joi.string().label("Shipping Address").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  userEmail: Joi.string().label('Email').required().trim().lowercase().email({ tlds: { allow: false } })
    .messages({
      "any.required": "{#label} is required",
      "string.base": "{#label} should be a string",
      "string.empty": "{#label} should not be empty",
      "string.email": "{#label} is invalid",
    }),
  phone: Joi.string().label('phone').min(8).max(20).trim().required().messages({
    "any.required": "{#label} is required",
    "any.invalid": "{#label} did not seem to be a phone number",
    "string.empty": "{#label} should not be empty",
  }),
});

export const AdminSchema = Joi.object().keys({
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
  day: Joi.number().label("day").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  month: Joi.number().label("month").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  year: Joi.number().label("year").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  gender: Joi.string().label("gender").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  city: Joi.string().label("City").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  state: Joi.string().label("State / Province").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  zipCode: Joi.string().label("Zip / Postal Code").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  address: Joi.string().label("Address").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
});

export const GuestUserSchema = Joi.object().keys({
  guestEmail: Joi.string().label('Email').required().trim().lowercase().email({ tlds: { allow: false } })
    .messages({
      "any.required": "{#label} is required",
      "string.base": "{#label} should be a string",
      "string.empty": "{#label} should not be empty",
      "string.email": "{#label} is invalid",
    }),
  shippingAddress: Joi.string().label("Shipping Address").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
  state: Joi.string().label("State / Province").required().messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} should not be empty",
  }),
})

export const ChangePasswordSchema = Joi.object().keys({
  currentPassword: Joi.string()
    .label("Current Password")
    .required()
    .min(8)
    .messages({
      "any.required": "{#label} is required",
      "string.base": "{#label} should be a string",
      "string.empty": "{#label} should not be empty",
      "string.min": "{#label} must contain at least 8 characters",
    }),
  newPassword: Joi.string().label("New Password").required().min(8).messages({
    "any.required": "{#label} is required",
    "string.base": "{#label} should be a string",
    "string.empty": "{#label} should not be empty",
    "string.min": "{#label} must contain at least 8 characters",
  }),
  confirmPassword: Joi.required()
    .label("Confirm Password")
    .valid(Joi.ref("newPassword"))
    .messages({
      "any.required": "{#label} is required",
      "any.only": "Passwords do not match",
      "string.empty": "{#label} should not be empty",
    }),
});
