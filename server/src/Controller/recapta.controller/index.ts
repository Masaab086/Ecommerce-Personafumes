import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config({ path: "../../../.env" });
import AppError from "../../utils/AppError";

export const verifyRecapta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?  
           secret=${secretKey}&response=${token}`,
      {
        method: "POST",
      }
    );
  } catch (e: any) {
    return next(new AppError("server_error", e.message, 500));
  }
};
