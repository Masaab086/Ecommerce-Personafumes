import { error } from "console";
import { NextFunction, Request, Response } from "express";
import Media from "twilio/lib/rest/Media";
import { bottle, personalization } from "../../models/bottle.modal";
import { bottleMedia } from "../../models/bottleMedia.modal";
import {
  deleteTableData,
  getLatestInserted,
  getTableData,
  insertTableData,
  updateTableData,
} from "../../db/db";
import AppError from "../../utils/AppError";
import { catchAsync } from "../../utils/catch.async";

export const createBottle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bottleId: string = new Date().valueOf().toString();
    const newBottle: bottle = {
      bottleId,
      capacity: req.body.capacity,
      availableQuantity: req.body.availableQuantity,
      price: req.body.price,
      unitOfMeasure: req.body.unitOfMeasure ? req.body.unitOfMeasure : `ML`,
      personalizable: req.body.personalizable,
      published: req.body.published,
      bottleName: req.body.bottleName,
      categoryType: req.body.categoryType,
    };

    insertTableData("bottle", newBottle).then(async (bottle) => {
      for (let i = 0; i < Media.length; i++) {
        const bottleMedia: bottleMedia = {
          mediaId: new Date().valueOf().toString(),
          bottleId: bottleId,
          side: "default",
          imagePointer: req.body.media[i].imagePointer,
        };

        await insertTableData("bottleMedia", bottleMedia);
      }

      const newPersonalization: personalization = {
        personalizationPriceId: new Date().valueOf().toString(),
        bottleId,
        textPrice: req.body.personalizeInfo.textPrice,
        mediaPrice: req.body.personalizeInfo.mediaPrice,
        artPrice: req.body.personalizeInfo.artPrice,
        minQuantity: req.body.personalizeInfo.minQuantity,
        backImagePointer: req.body.personalizeInfo.backImagePointer,
        frontImagePointer: req.body.personalizeInfo.frontImagePointer,
      };

      await insertTableData("personalizationPrice", newPersonalization);

      res.json({
        status: "success",
        code: "created_record",
        message: "Bottle record has been created successfully",
        bottle,
      });

      //
    });
  }
);

export const updateBottle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const bottleId = req.params.id;
    const updateBottle: bottle = {
      capacity: req.body.capacity,
      availableQuantity: req.body.availableQuantity,
      price: req.body.price,
      unitOfMeasure: req.body.unitOfMeasure ? req.body.unitOfMeasure : `ML`,
      personalizable: req.body.personalizable,
      published: req.body.published,
      bottleName: req.body.bottleName,
      categoryType: req.body.categoryType,
    };

    updateTableData("bottle", updateBottle, [
      { key: "bottleId", condition: "=", value: bottleId },
    ])
      .then(async (bottle: any) => {
        res.json({
          status: "success",
          code: "updated_record",
          message: "Bottle record has been updated successfully",
          bottle,
        });
      })
      .catch((err) => next(err));
  }
);
export const deleteBottle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bottleId = req.params.id;

    await updateTableData("bottle", { deleted: true }, [
      { key: "bottleId", value: bottleId, condition: " = " },
    ]).then((data) => {
      res.json({
        status: "success",
        code: "record_deleted",
        message: "Bottle record deleted",
      });
    });
  }
);

export const getAllBottles = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    getTableData("bottle", [
      { key: "deleted", value: false, condition: " = " },
      { key: "published", value: true, condition: " = " },
    ])
      .then(async (bottles: any) => {
        for (let i = 0; i < bottles.length; i++) {
          bottles[i].media = await getTableData("bottleMedia", [
            {
              key: "bottleId",
              value: bottles[i].bottleId,
              condition: " = ",
            },
          ]);
        }
        for (let i = 0; i < bottles.length; i++) {
          bottles[i].personalizeInfo = await getTableData(
            "personalizationPrice",
            [
              {
                key: "bottleId",
                value: bottles[i].bottleId,
                condition: " = ",
              },
            ]
          );
        }
        return res.json({ status: "success", code: "record_founded", bottles });
      })
      .catch((err) => {
        next(new AppError("server_error", err.message, 500));
      });
  }
);
export const getAllBottlesAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    getTableData("bottle")
      .then(async (bottles: any) => {
        for (let i = 0; i < bottles.length; i++) {
          bottles[i].media = await getTableData("bottleMedia", [
            {
              key: "bottleId",
              value: bottles[i].bottleId,
              condition: " = ",
            },
          ]);
        }
        for (let i = 0; i < bottles.length; i++) {
          bottles[i].personalizeInfo = await getTableData(
            "personalizationPrice",
            [
              {
                key: "bottleId",
                value: bottles[i].bottleId,
                condition: " = ",
              },
            ]
          );
        }
        return res.json({ status: "success", code: "record_founded", bottles });
      })
      .catch((err) => {
        next(new AppError("server_error", err.message, 500));
      });
  }
);

export const getLatestBottles = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    getLatestInserted("bottle", "dateCreated")
      .then(async (bottles: any) => {
        for (let i = 0; i < bottles.length; i++) {
          bottles[i].media = await getTableData("bottleMedia", [
            {
              key: "bottleId",
              value: bottles[i].bottleId,
              condition: " = ",
            },
          ]);
        }
        for (let i = 0; i < bottles.length; i++) {
          bottles[i].personalizeInfo = await getTableData(
            "personalizationPrice",
            [
              {
                key: "bottleId",
                value: bottles[i].bottleId,
                condition: " = ",
              },
            ]
          );
        }
        return res.json({
          status: "success",
          code: "record_founded",
          bottles,
        });
      })
      .catch((err) => {
        return next(new AppError("server_error", err.message, 500));
      });
  }
);

export const publish = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bottleId = req.params.id;
    updateTableData("bottle", { published: req.body.published }, [
      { key: "bottleId", value: bottleId, condition: " = " },
    ]).then((bottle) => {
      res.json({
        status: "success",
        code: "record_updated",
        message: "Bottle has been published",
        bottle,
      });
    });
  }
);

export const getABottle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bottleId = req.params.id;

    const bottle: any = await getTableData("bottle", [
      { key: "bottleId", value: bottleId, condition: " = " },
    ]);

    const bottleMedia = await getTableData("bottleMedia", [
      { key: "bottleId", value: bottleId, condition: " = " },
    ]);

    const personalizationPrice = await getTableData("personalizationPrice", [
      { key: "bottleId", value: bottleId, condition: " = " },
    ]);

    bottle[0].bottleMedia = bottleMedia;
    bottle[0].personalizationInfo = personalizationPrice;

    res.json({
      status: "success",
      code: "record_founded",
      message: "Bottle Record founded",
      bottle,
    });
  }
);
