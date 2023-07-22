import { NextFunction, Request, Response } from "express";
import connection, {
  deleteTableData,
  executeQuery,
  getTableData,
  insertTableData,
  updateTableData,
} from "../../db/db";
import { fragrance } from "../../models/fragrance.modal";
import { conditionList } from "../../models/sqldata.modal";
import { catchAsync } from "../../utils/catch.async";

export const createFragrance = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newFragrance: fragrance = {
      fragranceId: new Date().valueOf().toString(),
      fragranceName: req.body.fragranceName,
      inspiration: req.body.inspiration,
      target: req.body.target,
      unitOfMeasure: req.body.unitOfMeasure,
      unitCost: req.body.unitCost,
      gender: req.body.gender,
      availableUnites: req.body.availableUnites,
    };

    insertTableData("fragrance", newFragrance)
      .then((fragrance) =>
        res.json({
          status: "success",
          code: "record_created",
          message: "New Fragrance Added",
          fragrance,
        })
      )
      .catch((err) => next(err));
  }
);

export const updateFragrance = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const fragranceId = req.params.id;
    const oldFragrance: fragrance = {
      fragranceName: req.body.fragranceName,
      inspiration: req.body.inspiration,
      target: req.body.target,
      unitOfMeasure: req.body.unitOfMeasure,
      unitCost: req.body.unitCost,
      gender: req.body.gender,

      availableUnites: req.body.availableUnites,
    };

    updateTableData("fragrance", oldFragrance, [
      { key: "fragranceId", condition: " = ", value: fragranceId },
    ])
      .then((fragrance) =>
        res.json({
          status: "success",
          code: "record_updated",
          message: "Fragrance Updated",
          fragrance,
        })
      )
      .catch((err) => next(err));
  }
);

export const deleteFragrance = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const fragranceId = req.params.id;

    await updateTableData("fragrance", { deleted: true }, [
      { key: "fragranceId", value: fragranceId, condition: " = " },
    ]).then((data) => {
      res.json({
        status: "success",
        code: "record_deleted",
        message: "Bottle record deleted",
      });
    });
  }
);

export const getAllFragrance = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const condition: conditionList = [
      { key: "deleted", value: false, condition: " = " },
      { key: "published", value: true, condition: " = " },
    ];

    if (req.query.type) {
      condition.push({
        key: "gender",
        value: `${req.query.type}`,
        condition: " = ",
      });
    }

    getTableData("fragrance", condition)
      .then((fragrances) =>
        res.json({
          status: "success",
          code: "record_updated",
          message: "Fragrance Updated",
          fragrances,
        })
      )
      .catch((err) => next(err));
  }
);

export const getAllFragranceAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    getTableData("fragrance")
      .then((fragrances) =>
        res.json({
          status: "success",
          code: "record_updated",
          message: "Fragrance Updated",
          fragrances,
        })
      )
      .catch((err) => next(err));
  }
);

export const createSpecialArray = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const fragrances = req.body.fragrances;

    for (let i = 0; i < fragrances.length; i++) {
      const fragranceId = new Date().valueOf().toString();
      const fragranceName = fragrances[i].fragranceName;
      const gender = fragrances[i].gender;
      const inspiration = fragrances[i].inspiration;
      const target = fragrances[i].target;

      const unitOfMeasure = "ML";
      const unitCost = 0.5;
      const availableUnites = 2000;

      // const newFragrance: fragrance = {
      //   fragranceId: new Date().valueOf().toString(),
      //   fragranceName: req.body.fragranceName,
      //   inspiration: req.body.inspiration,
      //   target: req.body.target,
      //   unitOfMeasure: req.body.unitOfMeasure,
      //   unitCost: req.body.unitCost,
      //   gender: req.body.gender,
      //   availableUnites: req.body.availableUnites,
      // };

      await insertTableData("fragrance", {
        fragranceId,
        fragranceName,
        inspiration,
        target,
        unitOfMeasure,
        unitCost,
        gender,
        availableUnites,
      });
    }

    res.json({ status: "success" });
  }
);

export const publishFragrance = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const fragranceId = req.params.id;
    updateTableData("fragrance", { published: req.body.published }, [
      { key: "fragranceId", value: fragranceId, condition: " = " },
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
