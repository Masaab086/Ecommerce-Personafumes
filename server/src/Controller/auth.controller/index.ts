import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import connection, { getTableData, insertTableData } from "../../db/db";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { getSafeObject } from "../../utils/get.safe.object";

import AppError from "../../utils/AppError";
import { sendEmail } from "../../utils/Email";
import { generateOtp, sendOtp } from "../../utils/Twilio";
import { catchAsync } from "../../utils/catch.async";
import { customer } from "../../models/customer.modal";

dotenv.config({ path: "../../../.env" });

// Register or Signup Function

export const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Validating  our request
    const err: any = validationResult(req);
    if (!err.isEmpty()) {
      next(new AppError("invalid_req_body", err.errors[0].msg, 400));
    }

    const {
      firstName,
      lastName,
      userEmail,
      phone,
      userPassword,
      gender,
      dateOfBirth,
      sendInfo,
      recordInfo,
    } = req.body;

    //   Hashing the password password
    const hashPassword: string = await bcrypt.hash(req.body.userPassword, 10);

    // Creting a customer object
    const customer: customer = {
      customerId: new Date().valueOf().toString(),
      firstName,
      lastName,
      userEmail,
      phone,
      userPassword: hashPassword,
      gender,
      dateOfBirth,
      sendInfo,
      recordInfo,
    };

    insertTableData("customer", customer).then((customer) => {
      const safeUser = getSafeObject(
        {
          firstName,
          lastName,
          userEmail,
          phone,
          userPassword,
          gender,
          dateOfBirth,
          sendInfo,
          recordInfo,
        },
        ["userPassword"]
      );

      return res.json({
        status: "success",
        code: "record_created",
        message: `User Created `,
        user: safeUser,
      });
    });
  }
);

// email vailadation
export const sendEmailToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const err: any = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppError("invalid_req_body", err.errors[0].msg, 400));
    }
    const { email } = req.body;

    getTableData("customer", [
      { key: "userEmail", value: email, condition: " = " },
    ])
      .then(async (customer: any) => {
        if (customer.length > 0) {
          const token: string = crypto.randomBytes(64).toString("hex");

          // Inserting the email otp
          const emailOtp: any = {
            emailOtpId: new Date().valueOf().toString(),
            email,
            token,
            expireyDate: new Date().valueOf().toString(),
          };

          await insertTableData("emailOtp", emailOtp);
          sendEmail(
            email,
            "An OTP verification Email",
            `<a href="${process.env.CLIENT_URL}/emailverify?id=${customer[0].customerId}&token=${token}">Click here to verify your email</a>`
          );

          res.json({
            status: "success",
            code: "email_sent",
            message: "A verification link is sent to your email address",
          });
        }
      })
      .catch((err) => next(err));
  }
);

// -----------------------------------VERIFY NEW USER EMAIL----------------------------------------------------------
export const verifyEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // userEmail to customerId
    const { token, id } = req.body;

    const err: any = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppError("invalid_req_body", err.errors[0].msg, 400));
    }

    connection.execute(
      "SELECT * from emailOtp where emailToken = ? and customerId = ?",
      [token, id],
      (err: any, result: any) => {
        if (err) return next(new AppError("server_error", err.message, 500));

        if (!result) {
          return next(
            new AppError("invalid_req_query", "Click on a valid otp link", 401)
          );
        } else {
          const currDate = new Date();
          const sqlDate = new Date(
            parseInt(result[0].expireyDate) + 1000 * 86400
          );
          if (currDate < sqlDate) {
            connection.execute(
              "update customer set isEmailVerified = ? where customerId = ?",
              [true, id],
              (err: any) => {
                if (err) {
                  return next(
                    new AppError(
                      "invalid_req_query",
                      "Click on a valid otp link",
                      401
                    )
                  );
                }

                connection.execute(
                  "delete from emailOtp where customerId = ? ",
                  [id]
                );

                connection.execute(
                  "select * from customer where customerId = ?",
                  [id],
                  (err: any, result: any) => {
                    if (err) {
                      return next(
                        new AppError("server_error", err.message, 500)
                      );
                    }

                    const safeUser = getSafeObject(result[0], ["userPassword"]);
                    const jwt = getToken({
                      userEmail: result[0].userEmail,
                      customerId: result[0].customerId,
                    });
                    res.json({
                      status: "success",
                      code: "email_verified",
                      message: "Your email has been verified",
                      jwt,
                      user: safeUser,
                    });
                  }
                );
              }
            );
          } else {
            return next(
              new AppError(
                "invalid_req_query",
                "Your opt link has been expired",
                401
              )
            );
          }
        }
      }
    );
  }
);

//----------------------------------------SEND FORGOTTEEN PASSWORD LINK FUNCTION-------------------------------------------

export const sendForgottenPasswordLink = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const err: any = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppError("invalid_req_body", err.errors[0].msg, 400));
    }
    const { email } = req.body;
    connection.execute(
      "SELECT * FROM customer where userEmail = ?",
      [email],
      (err: any, result: any) => {
        if (err) {
          return next(new AppError("server_error", err.message, 500));
        }
        // generating a random token
        const token = crypto.randomBytes(64).toString("hex");

        const emailOtpId = new Date().valueOf() + "";
        connection.execute(
          "insert into emailOtp set customerId = ? , emailOtpId = ? , email = ? , emailToken = ? , expireyDate = ?",
          [result[0].customerId, emailOtpId, email, token, emailOtpId]
        );
        sendEmail(
          email,
          "An OTP verification Email",
          `<a href="${process.env.CLIENT_URL}/resetpassword?id=${result[0].customerId}&token=${token}">Click here to verify your email</a>`
        );

        res.json({
          status: "success",
          code: "email_sent",
          message: "A verification link is sent to your email address",
        });
      }
    );
  } catch (e: any) {
    return next(new AppError("server_error", e.message, 500));
  }
};

//------------------------------------------verifying  the forgotted password and update the password- ---------------------------------------------------------------------

export const verifyForgottenPasswordLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const err: any = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppError("invalid_req_body", err.errors[0].msg, 400));
    }
    const { token, password, id } = req.body;

    connection.execute(
      "select * from emailOtp where emailToken = ? and customerId=?",
      [token, id],
      async (err: any, result: any) => {
        if (err) {
          return next(new AppError("server_error", err.message, 500));
        } else {
          const customerId = result[0].customerId;
          const currDate = new Date();
          const sqlDate = new Date(
            parseInt(result[0].expireyDate) + 1000 * 86400
          );
          console.log({ currDate, sqlDate });
          if (currDate < sqlDate) {
            const hashPassword = await bcrypt.hash(password, 10);
            connection.execute(
              "update customer set userPassword = ? where customerId = ?",
              [hashPassword, id],
              (err: any) => {
                if (err) {
                  return next(new AppError("server_error", err.message, 500));
                } else {
                  connection.execute(
                    "delete from emailOtp where customerId = ?",
                    [id]
                  );
                  res.json({
                    status: "success",
                    code: "password_updated",
                    message: "your password has been updated",
                  });
                }
              }
            );
          } else {
            return next(
              new AppError(
                "invalid_req_query",
                "Your verification link has been expired",
                500
              )
            );
          }
        }
      }
    );
  } catch (e: any) {
    return next(new AppError("server_error", e.message, 500));
  }
};

// Login function to login the user

export const login = catchAsync(
  async (req: any, res: any, next: NextFunction) => {
    const err: any = validationResult(req);
    if (!err.isEmpty()) {
      next(new AppError("invalid_req_body", err.errors[0].msg, 400));
    }

    const { userEmail, userPassword } = req.body;

    // For the user in the admin Tables
    connection.execute(
      `SELECT * FROM admin where userEmail = ?`,
      [userEmail],
      async (err: any, result: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        // Verifying the password
        if (result.length > 0) {
          if (await bcrypt.compare(userPassword, result[0].userPassword)) {
            // Sigining the JWT
            const jwt = getToken({
              adminId: result[0].adminId,
              userEmail: userEmail,
            });

            // Cretating a safe user
            const safeUser = getSafeObject(result[0], ["userPassword"]);

            return res.json({
              status: "success",
              code: "authenticated",
              message: "Login successful",
              jwt,
              user: safeUser,
            });
          } else {
            return res.status(401).json({
              status: "failed",
              code: "unauthenticated",
              message: "Incorrect Email or Password",
            });
          }
        } else {
          // Now Searching in the customer table

          console.log("Searching the customer table ");

          // For the Customer in the admin Tables
          connection.execute(
            `SELECT * FROM customer where userEmail = ?`,
            [userEmail],
            async (err: any, result: any) => {
              if (err) {
                return res.status(500).json(err);
              }

              // Verifying the password
              if (result.length > 0) {
                if (
                  await bcrypt.compare(userPassword, result[0].userPassword)
                ) {
                  // Sigining the JWT
                  const jwt = getToken({
                    customerId: result[0].customerId,
                    userEmail: userEmail,
                  });

                  // Cretating a safe user
                  let safeUser = getSafeObject(result[0], ["userPassword"]);

                  return res.json({
                    status: "success",
                    code: "authenticated",
                    message: "Login successful",
                    jwt,
                    user: safeUser,
                  });
                } else {
                  return res.status(401).json({
                    status: "failed",
                    code: "unauthenticated",
                    message: "Incorrect Email or Password",
                  });
                }
              } else {
                return res.status(401).json({
                  status: "failed",
                  code: "unauthenticated",
                  message: "Incorrect Email or Password",
                });
              }
            }
          );
        }
      }
    );
  }
);

// Get user function to send the data of a specific user
export const getMe = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Executing our query

    connection.execute(
      "Select * from customer where userEmail= ?",
      [req.body.decode.userEmail],

      async function (err: any, rows: any) {
        if (err) {
          console.log(err);
        }
        if (rows.length > 0) {
          const safeUser = getSafeObject(rows[0], ["userPassword"]);
          res.json({
            status: "success",
            code: "ok",
            message: "Get User",
            safeUser,
          });
        } else {
          // Validation our request

          return res.status(401).json({
            status: "failed",
            code: "not found",
            message: "User Data not found",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// This will required admin authentication
export const getAll = (req: Request, res: Response) => {
  try {
    connection.execute("select * from customer", (err: any, result: any) => {
      if (err) {
        throw err;
      }

      let customers = [];

      for (let i = 0; i < result.length; i++) {
        customers.push(getSafeObject(result[i], ["userPassword"]));
      }

      return res.json({
        status: "success",
        code: "Users data found",
        message: "user data",

        customers,
      });
    });
  } catch (err) {
    throw err;
  }
};

// Creating an Admin
export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validation our request
    const err: any = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppError("invalid_req_body", err.errors[0].msg, 400));
    }

    const { firstName, lastName, userEmail, userPassword, role } = req.body;
    // Hashing our password
    const hashPassword = await bcrypt.hash(userPassword, 10);

    console.log("Hashing our pssword");
    // creating sql to create a user
    const adminId = new Date().valueOf() + "";

    connection.execute(
      `INSERT INTO admin SET adminId = ?, firstName = ?,lastName = ? ,userEmail = ? , userPassword = ? , role = ?`,
      [adminId, firstName, lastName, userEmail, hashPassword, role],
      (err: any, result: any) => {
        if (err) {
          console.log(err);
          if (err.errno == 1062) {
            return next(
              new AppError("duplicate_key", "User Already exists", 409)
            );
          }
        } else {
          // Sigining the JWT
          console.log(result);
          const jwt = getToken({
            adminId: adminId,
            userEmail: userEmail,
          });

          // Cretating a safe user
          const safeUser = getSafeObject(
            {
              firstName,
              lastName,
              userEmail,
              userPassword,
              role,
            },
            ["userPassword"]
          );

          return res.json({
            status: "success",
            code: "authenticated",
            jwt,
            user: safeUser,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    if (err) res.status(500).json(err);
  }
};

export const updateAddress = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const err: any = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppError("invalid_req_body", err.errors[0].msg, 400));
    }
    const { shippingAddress } = req.body;
    const customerId = req.body.decode.customerId;
    if (customerId) {
      connection.execute(
        "UPDATE customer set shippingAddress = ? where customerId = ?",
        [shippingAddress, customerId],
        (err: any) => {
          if (err) {
            console.log(err);
            return next(
              new AppError("server_error", "Database server error", 500)
            );
          }

          return res.json({
            status: "success",
            code: "updated",
            message: "Customer Shipment address updated ",
            shippingAddress: shippingAddress,
          });
        }
      );
    } else {
      res.status(401).json({
        status: "fail",
        code: "not_updated",
        message: "Enter a valid customer information ",
      });
    }
  } catch (err) {
    return next(new AppError("server_error", "Internal Server error", 500));
  }
};

export const getMyAddress = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.body.decode.customerId;

    connection.execute(
      "SELECT shippingAddress from customer where customerId = ?",
      [customerId],
      (err: any, result: any) => {
        if (err) {
          return next(
            new AppError("server_error", "Database server error", 500)
          );
        }

        res.json({
          status: "success",
          code: "record_founded",
          message: "record founded with the provided information",
          shippingAddress: result[0].shippingAddress,
        });
      }
    );
  } catch (err) {
    return next(new AppError("server_error", "Internal server error", 500));
  }
};

export const deleteCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ status: "Success" });
  } catch (e: any) {
    return next(new AppError("server_error", e.message, 500));
  }
};

//-------------------SEND VERIFICATION OTP FUNCTION ------------------------------------------------------

export const sendVerificationOtp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const err: any = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppError("invalid_req_body", err.errors[0].msg, 400));
    }
    const { phone } = req.body;

    connection.execute(
      "SELECT * FROM customer where phone = ?",
      [phone],
      (err: any, result: any) => {
        if (err) {
          return next(new AppError("server_error", err.message, 500));
        }

        if (result.length > 0) {
          // Generarating OTP
          const newOtp = generateOtp();

          // Saving the otp in our Database
          const otpId = new Date().valueOf() + "";
          connection.execute(
            "insert into phoneOtp set otpId = ? , customerId = ? , otpCode = ?, phone = ?, createdTime = ?",
            [otpId, result[0].customerId, newOtp, phone, otpId],
            async (err: any) => {
              if (err) {
                return next(new AppError("server_error", err.message, 500));
              }

              const messageResponse = await sendOtp(phone, newOtp);
              console.log(messageResponse);

              console.log(newOtp);

              res.json({
                status: "success",
                code: "otp_sent",
                message: "Your otp has been sent to your phone number",
              });
            }
          );
        } else {
          return next(
            new AppError("user_not_found", "Phone number not founded", 401)
          );
        }
      }
    );
  } catch (e: any) {
    return next(new AppError("server_error", e.message, 500));
  }
};

/// ---------------------VALIDATE OTP FUNCTION ---------------------------------------------------------------
export const validateOtp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const err: any = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppError("invalid_req_body", err.errors[0].msg, 400));
    }
    const { otp, phone } = req.body;

    // CHecking the right otp
    connection.execute(
      "SELECT * from phoneOtp where phone = ? and otpCode = ?",
      [phone, otp],
      (err: any, result: any) => {
        if (err) {
          return next(new AppError("server_error", err.message, 500));
        }

        if (result.length > 0) {
          // Now checking the expirey date
          const currDate = new Date();
          const sqlDate = new Date(
            parseInt(result[0].createdTime) + 86400 * 1000
          );

          if (currDate < sqlDate) {
            connection.execute(
              "update customer set isPhoneVerified = ? where phone = ?",
              [true, phone],
              (err: any) => {
                if (err) {
                  return next(new AppError("server_error", err.message, 500));
                }

                connection.execute(
                  "SELECT * From customer where phone = ?",
                  [phone],
                  (err: any, result: any) => {
                    if (err) {
                      return next(
                        new AppError("server_error", err.message, 500)
                      );
                    }

                    if (result.length > 0) {
                      const jwt = getToken({
                        customerId: result[0].customerId,
                        userEmail: result[0].userEmail,
                      });

                      connection.execute(
                        "delete from phoneOtp where phone = ?",
                        [phone]
                      );

                      return res.json({
                        status: "success",
                        code: "phone_verified",
                        message: "Your phone number has been verified",
                        jwt: jwt,
                      });
                    }
                  }
                );
              }
            );
          }
        } else {
          return next(
            new AppError(
              "unauthenticated",
              "The provided otp is incorrect",
              401
            )
          );
        }
      }
    );
  } catch (e: any) {
    return next(new AppError("server_error", e.message, 500));
  }
};
export const resetPasswordOtp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const err: any = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppError("invalid_req_body", err.errors[0].msg, 400));
    }
    const { otp, phone, password } = req.body;

    // CHecking the right otp
    connection.execute(
      "SELECT * from phoneOtp where phone = ? and otpCode = ?",
      [phone, otp],
      (err: any, result: any) => {
        if (err) {
          return next(new AppError("server_error", err.message, 500));
        }

        if (result.length > 0) {
          // Now checking the expirey date
          const currDate = new Date();
          const sqlDate = new Date(
            parseInt(result[0].createdTime) + 86400 * 1000
          );

          if (currDate < sqlDate) {
            connection.execute(
              "update customer set userPassword = ? where phone = ?",
              [password, phone],
              (err: any) => {
                if (err) {
                  return next(new AppError("server_error", err.message, 500));
                }

                connection.execute(
                  "SELECT * From customer where phone = ?",
                  [phone],
                  (err: any, result: any) => {
                    if (err) {
                      return next(
                        new AppError("server_error", err.message, 500)
                      );
                    }

                    if (result.length > 0) {
                      const jwt = getToken({
                        customerId: result[0].customerId,
                        userEmail: result[0].userEmail,
                      });

                      connection.execute(
                        "delete from phoneOtp where phone = ?",
                        [phone]
                      );

                      return res.json({
                        status: "success",
                        code: "phone_verified",
                        message: "Your phone number has been verified",
                        jwt: jwt,
                      });
                    }
                  }
                );
              }
            );
          }
        } else {
          return next(
            new AppError(
              "unauthenticated",
              "The provided otp is incorrect",
              401
            )
          );
        }
      }
    );
  } catch (e: any) {
    return next(new AppError("server_error", e.message, 500));
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newPassword, currentPassword, confirmPassword } = req.body;

    const customerId = req.body.decode.customerId;
    const adminId = req.body.decode.adminId;

    let table = "customer";
    let key = "customerId";
    let value = customerId;

    if (customerId == undefined) {
      table = "admin";
      key = "adminId";
      value = adminId;
    }

    connection.execute(
      `SELECT * from ${table} where ${key} = ?`,
      [value],
      async (err: any, result: any) => {
        if (err) {
          return next(new AppError("server_error", err.message, 500));
        } else if (result.length > 0) {
          if (await bcrypt.compare(currentPassword, result[0].userPassword)) {
            console.log("Executed");
            const hashPassword = await bcrypt.hash(newPassword, 10);
            connection.execute(
              `update  ${table} set userPassword = ? where ${key} = ?`,
              [hashPassword, value],
              (err: any) => {
                if (err) {
                  return next(new AppError("server_error", err.message, 500));
                } else {
                  let jwt = "";
                  if (customerId)
                    jwt = getToken({
                      userEmail: result[0].userEmail,
                      customerId: result[0].customerId,
                    });
                  else {
                    jwt = getToken({
                      userEmail: result[0].userEmail,
                      adminId: result[0].adminId,
                    });
                  }
                  res.json({
                    status: "success",
                    code: "record_changed",
                    message: "Your password has been changed successfully",
                    jwt,
                  });
                }
              }
            );
          } else {
            return next(
              new AppError(
                "unauthenticated",
                "Please enter your old valid password",
                401
              )
            );
          }
        } else {
          return next(new AppError("unauthenticated", "User not found", 401));
        }
      }
    );

    // Checking the current password
  } catch (e: any) {
    return next(new AppError("server_error", e.message, 500));
  }
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      city,
      dateOfBirth,
      firstName,
      gender,
      lastName,
      shippingAddress,
      state,
      zipCode,
    } = req.body;

    const customerId = req.body.decode.customerId;

    const address = `${shippingAddress} , ${city},  ${zipCode} , ${state} } `;
    connection.execute(
      `UPDATE customer set   dateOfBirth = ? , firstName = ? , lastName = ? , gender = ? ,  shippingAddress = ? where customerId = ? , city = ? , state = ? , zipCode = ?`,
      [
        dateOfBirth,
        firstName,
        lastName,
        gender,
        shippingAddress,
        city,
        state,
        zipCode,
        customerId,
      ],
      (err: any) => {
        if (err) {
          return next(new AppError("server_error", err.message, 500));
        } else {
          connection.execute(
            `SELECT * from customer where customerId = ?`,
            [customerId],
            (err: any, result: any) => {
              if (err) {
                return next(new AppError("server_error", err.message, 500));
              } else {
                const safeUser = getSafeObject(result[0], ["userPassword"]);
                res.json({
                  status: "success",
                  code: "record_changed",
                  message: "Your profile has been updated",
                  customer: safeUser,
                });
              }
            }
          );
        }
      }
    );
  } catch (e: any) {
    return next(new AppError("server_error", e.message, 500));
  }
};

const getToken = (data: any) => {
  return jwt.sign(data, "lksajdfljoho1h2o3h9hofhd098y1h23kjhf", {
    expiresIn: "30d",
  });
};
