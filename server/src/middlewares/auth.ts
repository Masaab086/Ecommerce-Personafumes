import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { getTableData } from "../db/db";
import { condition, table } from "../models/sqldata.modal";
import { catchAsync } from "../utils/catch.async";

export const requireLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.body.token;

    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Checking the token
    if (!token) {
      return new AppError(
        "unauthenticated",
        "You are not logged in. Please Log in to get access",
        401
      );
    }

    let decode: JwtPayload;
    // Verifying the jwt
    try {
      decode = jwt.verify(
        token,
        "lksajdfljoho1h2o3h9hofhd098y1h23kjhf"
      ) as JwtPayload;
    } catch (e) {
      return new AppError(
        "unauthenticated",
        "You are not logged in. Please Log in to get access",
        401
      );
    }

    let table: table = "customer";

    let condition: condition = {
      key: "",
      value: "",
      condition: "",
    };

    if (decode.customerId) {
      condition = {
        key: "customerId",
        value: decode.customerId,
        condition: " = ",
      };
    } else if (decode.customerId) {
      table = "admin";
      condition = {
        key: "adminId",
        value: decode.adminId,
        condition: " = ",
      };
    } else {
      return new AppError(
        "unauthenticated",
        "Invalid login token. Please use valid token to get access",
        401
      );
    }

    getTableData(table, [condition]).then((data: any) => {
      if (data.length > 0) {
        req.body.decode = decode;
        next();
      } else {
        return new AppError("unauthenticated", "No user record founded", 401);
      }
    });

    /*
  let id = "";
  let SQL = "";
  if (decode.customerId) {
    id = decode.customerId;
    SQL = "SELECT * FROM customer where customerId = ?";
  } else if (decode.adminId) {
    id = decode.adminId;
    SQL = "SELECT * FROM admin where adminId = ?";
  }
  connection.execute(SQL, [id], (err: any, result: any) => {
    if (err) {
      return next(
        new AppError("server_error", "Internal server error occered", 404)
      );
    } else {
      if (result.length === 0) {
        return next(
          new AppError(
            "record_not_found",
            "user record not found in the db ",
            401
          )
        );
      }
    }
  });

  */
  }
);

export const requireAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Checking the token
    if (!token) {
      return next(
        new AppError(
          "unauthenticated",
          "You are not logged in. Please Log in to get access",
          401
        )
      );
    }

    let decode: JwtPayload;
    // Verifying the jwt
    try {
      decode = jwt.verify(
        token,
        "lksajdfljoho1h2o3h9hofhd098y1h23kjhf"
      ) as JwtPayload;
    } catch (e) {
      return next(
        new AppError(
          "unauthenticated",
          "You are not logged in. Please Log in to get access",
          401
        )
      );
    }

    req.body.decode = decode;

    getTableData("admin", [
      { key: "adminId", value: decode.adminId, condition: " = " },
    ]).then((data: any) => {
      if (data.length > 0) {
        req.body.decode = decode;
        next();
      } else {
        return new AppError("unauthenticated", "No user record founded", 401);
      }
    });

    /*

  connection.execute(
    `SELECT userEmail from admin where adminId = ? and userEmail = ?`,
    [decode.adminId, decode.userEmail],
    (err: any, result: any) => {
      if (err) {
        console.log("Executing this");
        console.log(err);
      } else {
        if (result.length != 0) {
          next();
        } else {
          return next(
            new AppError(
              "user_not_found",
              "User with the provided token not found",
              401
            )
          );
        }
      }
    }
  );

  */
  }
);

export const alreadyLogedin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Checking the token
    if (token) {
      return new AppError(
        "already_logged_in",
        "You are already logged in. Please Log out and then login  to get access",
        401
      );
    }

    next();
  }
);
