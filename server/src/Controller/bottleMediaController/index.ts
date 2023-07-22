import { NextFunction, Request, Response } from "express";
import { bottleMedia } from "../../models/bottleMedia.modal";
import {
  deleteTableData,
  getTableData,
  insertTableData,
  updateTableData,
} from "../../db/db";
import { catchAsync } from "../../utils/catch.async";

export const createBottleMedia = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newBottleImage: bottleMedia = {
      mediaId: new Date().valueOf().toString(),
      bottleId: req.body.bottleId,
      side: req.body.side,
      imagePointer: req.body.image,
    };

    insertTableData("bottleMedia", newBottleImage)
      .then((bottleImage) =>
        res.json({
          status: "success",
          code: "record_created",
          message: "Bottle image created Succcessfully",
          bottleImage,
        })
      )
      .catch((err) => next(err));
  }
);
export const updateBottleMedia = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bottleId: string = req.params.id;
    const newBottleImage: bottleMedia = {
      bottleId: req.body.bottleId,
      side: req.body.side,
      imagePointer: req.body.image,
    };

    updateTableData("bottleMedia", newBottleImage, [
      { key: "mediaId", value: bottleId, condition: " = " },
    ])
      .then((bottleImage) =>
        res.json({
          status: "success",
          code: "record_updated",
          message: "Bottle image updated Succcessfully",
          bottleImage,
        })
      )
      .catch((err) => next(err));
  }
);

export const deleteBottleMedia = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bottleId: string = req.params.id;

    deleteTableData("bottleMedia", [
      { key: "mediaId", value: bottleId, condition: " = " },
    ])
      .then((bottleImage) =>
        res.json({
          status: "success",
          code: "record_deleted",
          message: "Bottle image deleted Succcessfully",
        })
      )
      .catch((err) => next(err));
  }
);

export const getAllBottleMedia = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    getTableData("bottleMedia")
      .then((bottleImages) =>
        res.json({
          status: "success",
          code: "record_deleted",
          message: "Bottle image deleted Succcessfully",
          bottleImages,
        })
      )
      .catch((err) => next(err));
  }
);
