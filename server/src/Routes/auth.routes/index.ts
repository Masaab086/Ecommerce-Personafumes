import express from "express";
import {
  createAdmin,
  getAll,
  getMe,
  getMyAddress,
  login,
  registerUser,
  sendEmailToken,
  sendForgottenPasswordLink,
  verifyForgottenPasswordLink,
  updateAddress,
  verifyEmail,
  sendVerificationOtp,
  validateOtp,
  resetPasswordOtp,
  changePassword,
  updateProfile,
} from "../../controller/auth.controller";
import { body } from "express-validator";
import {
  alreadyLogedin,
  requireAdmin,
  requireLogin,
} from "../../middlewares/auth";
import { validateHuman } from "../../middlewares/recapta";

const authRouter = express.Router();

//   Route 1: Route for creating a user
authRouter.post(
  "/signup",
  [
    body("firstName", "First Name must not be empty").notEmpty(),
    body("lastName", "Last Name must not be empty").notEmpty(),
    body("userEmail", "Enter a valid Email Address").isEmail(),
    body("phone", "Phone number must not be null").notEmpty(),
    body("gender", "gender must not be empty").notEmpty(),
    body("userPassword", "Enter a valid password of atleast 8 character")
      .notEmpty()
      .isLength({ min: 8 }),
    body("dateOfBirth", "dateOfBirth must not be empty").notEmpty(),
    body("sendInfo", "Send Info is required").notEmpty(),
    body("recordInfo", "Record info is required").notEmpty(),
  ],

  registerUser
);

//   Route 2: Login
authRouter.post(
  "/login",
  [
    body("userEmail", "Enter a valid Email Address").isEmail(),
    body("userPassword", "Password must not be empty"),
  ],

  login
);

//   Route 3: Get user
authRouter.get("/getme", requireLogin, getMe);

// Route 4; Getting all user by the admin only
authRouter.get("/customer", requireAdmin, getAll);

// Route 4: creating our admin
authRouter.post(
  "/createadmin",
  [
    body("firstName", "First Name must not be empty").notEmpty(),
    body("lastName", "Last Name must not be empty").notEmpty(),
    body("userEmail", "Enter a valid Email Address").isEmail(),
    body("userPassword", "Password must not be empty"),
    body("role", "Role must not be empty").notEmpty(),
  ],
  createAdmin
);

authRouter.put(
  "/customer/address",
  [body("shippingAddress", "Shipping Address must not be empty").notEmpty()],
  requireLogin,
  updateAddress
);
authRouter.post(
  "/customer/address",
  [body("shippingAddress", "Shipping Address must not be empty").notEmpty()],
  requireLogin,
  updateAddress
);
authRouter.get("/customer/address", requireLogin, getMyAddress);

authRouter.post(
  "/customer/email/send",
  [body("email", "Please provide a valid email").isEmail()],
  sendEmailToken
);
authRouter.post(
  "/customer/email/verify",
  [
    body("token", "Token must not be empty").notEmpty(),
    body("id", "Id must not be empty").notEmpty(),
  ],
  verifyEmail
);

authRouter.post(
  "/customer/forgetpassword",
  [body("email", "Please enter a valid email").isEmail()],
  sendForgottenPasswordLink
);
authRouter.post(
  "/customer/forgetpassword/verify",
  [
    body("token", "Token must not be empty").isEmpty(),
    body("id", "Id must not be empty").notEmpty(),
    body("password", "Please enter a valid password").notEmpty(),
  ],
  verifyForgottenPasswordLink
);

authRouter.post(
  "/customer/otp/send",
  [body("phone", "Enter a vlid phone number").isMobilePhone("any")],
  sendVerificationOtp
);
authRouter.post(
  "/customer/otp/verify",
  [
    body("phone", "Enter a valid phone number").isMobilePhone("any"),
    body("otp", "Enter a vlid otp").notEmpty(),
  ],
  validateOtp
);
authRouter.post(
  "/customer/forgetpassword/otp/verify",
  [
    body("phone", "Enter a valid phone number").isMobilePhone("any"),
    body("otp", "Enter a vlid otp").notEmpty(),
    body("password", "Enter a valid Password").notEmpty().isLength({ min: 8 }),
  ],
  resetPasswordOtp
);
authRouter.put(
  "/user/password",
  requireLogin,

  changePassword
);

authRouter.put("/customer/profile", requireLogin, updateProfile);

export default authRouter;
