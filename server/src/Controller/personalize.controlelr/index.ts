import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch.async";
import { personalize } from "../../models/personalize.modal";
import { getTableData, insertTableData, updateTableData } from "../../db/db";

export const createPersonalize = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newPersonalize: any = {
      personalizeId: new Date().valueOf().toString(),
    };
    if (req.body.text) newPersonalize.text = req.body.text;
    if (req.body.uploadImage) newPersonalize.uploadImage = req.body.uploadImage;
    if (req.body.artImage) newPersonalize.artImage = req.body.artImage;
    if (req.body.font) newPersonalize.font = req.body.font;
    if (req.body.image) newPersonalize.image = req.body.image;

    insertTableData("personalize", newPersonalize)
      .then((personalize) =>
        res.json({
          status: "success",
          code: "record_created",
          message: "A personalize record has been created",
          personalize,
        })
      )
      .catch((err) => next(err));
  }
);

export const updatePersonalize = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newPersonalize: any = {};

    const personalizeId = req.body.id;

    if (req.body.text) newPersonalize.text = req.body.text;
    if (req.body.uploadImage) newPersonalize.uploadImage = req.body.uploadImage;
    if (req.body.artImage) newPersonalize.artImage = req.body.artImage;
    if (req.body.font) newPersonalize.font = req.body.font;
    if (req.body.image) newPersonalize.image = req.body.image;

    updateTableData("personalize", newPersonalize, [
      { key: "personalizeId", value: personalizeId, condition: " = " },
    ])
      .then((personalize) =>
        res.json({
          status: "success",
          code: "record_updated",
          message: "A personalize record has been updated",
        })
      )
      .catch((err) => next(err));
  }
);
