import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

export const validateHuman = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?  
           secret=${secretKey}&response=${token}`,
    {
      method: "POST",
    }
  );

  next();
};
