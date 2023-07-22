import express from "express";
import { body } from "express-validator";
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
  promoteCoupon,
  updateCoupon,
  verify,
} from "../../controller/coupon.controller";
import { requireAdmin } from "../../middlewares/auth";

const couponRouter = express.Router();

//startDate, endDate, campaignName, code, minAmount, discount
// Route 1: For creation of a coupon
couponRouter.post(
  "/admin/coupon",
  [
    body("startDate", "Enter a valid start date").notEmpty().isDate(),
    body("endDate", "Enter a valid end date").notEmpty().isDate(),
    body("campaignName", "Please enter a campaignName").notEmpty(),
    body("code", "Please enter a code").notEmpty(),
    body("minAmount", "Please enter a minAmount").notEmpty(),
    body("discount", "Please enter a discount").notEmpty(),
  ],
  requireAdmin,
  createCoupon
);
// Route 2: For getting all the coupons
couponRouter.get("/admin/coupon", requireAdmin, getCoupons);
// Route 3: For verification of the coupon
couponRouter.get("/coupon/verify/:code", verify);
// Route 4: For the updation of the coupon
couponRouter.put(
  "/admin/coupon/:id",
  [
    body("startDate", "Enter a valid start date").notEmpty().isDate(),
    body("endDate", "Enter a valid end date").notEmpty().isDate(),
    body("campaignName", "Please enter a campaignName").notEmpty(),
    body("code", "Please enter a code").notEmpty(),
    body("minAmount", "Please enter a minAmount").notEmpty(),
    body("discount", "Please enter a discount").notEmpty(),
  ],
  requireAdmin,
  updateCoupon
);
// Route 5: For the Deletion of the coupon
couponRouter.delete("/admin/coupon/:id", requireAdmin, deleteCoupon);

couponRouter.get("/admin/coupon/promotion/:id", requireAdmin, promoteCoupon);

export default couponRouter;
