import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch.async";
import connection, { getTableData } from "../../db/db";

export const getAllPersonalization = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    getTableData("personalizationPrice").then((personalize: any) => {
      res.json({ status: "success", code: "record_founded", personalize });
    });
  }
);
