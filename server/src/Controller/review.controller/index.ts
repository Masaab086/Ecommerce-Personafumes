import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catch.async";

export const createRating = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.body.decode.customerId;
    const bottleId = req.body.bottleId;

    // Finding the bottleId in the products of the bottles
  }
);
