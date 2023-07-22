import { Request, Response, NextFunction } from "express";
import { Stripe } from "stripe";

import connection, {
  deleteTableData,
  getTableData,
  insertTableData,
  updateTableData,
} from "../../db/db";
import { catchAsync } from "../../utils/catch.async";
import { sendEmail } from "../../utils/Email";

const stripe = new Stripe(
  "sk_test_51LTJ9sK4bR13Sd8QloCboHcBeZPnqE2EnviyWUQHBfFWPfsaSi2jGKjHdLVy7vpFHOMTYcmtibVK0eS6m5W3mBK400sjl8jkZf",
  {
    apiVersion: "2022-08-01",
  }
);

export const createCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    updateCouponStatus();

    // Coupons

    const { startDate, endDate, campaignName, code, discount, minAmount } =
      req.body;

    let status;
    const currDate = new Date().toISOString().split("T")[0];

    if (startDate.split("T")[0] > currDate) {
      status = "inactive";
    }

    if (
      startDate.split("T")[0] <= currDate &&
      endDate.split("T")[0] >= currDate
    ) {
      status = "avtice";
    }
    if (
      startDate.split("T")[0] < currDate &&
      endDate.split("T")[0] < currDate
    ) {
      status = "expired";
    }
    const newCoupon: any = {
      couponId: new Date().valueOf().toString(),
      startDate,
      endDate,
      campaignName,
      code,
      discount,
      minAmount,
      status,
    };

    await insertTableData("coupon", newCoupon);
    res.json({
      status: "success",
      code: "record_created",
      message: "Coupon Record Created",
      newCoupon,
    });
  }
);

//------------------------SELECTING ALL THE COUPONS FOR ADMIN-------------------------------------
export const getCoupons = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    updateCouponStatus();

    getTableData("coupon")
      .then((coupons: any) => {
        for (let i = 0; i < coupons.length; i++) {
          const currDate = new Date().toISOString().split("T")[0];
          console.log(coupons[i].startDate);
          coupons[i].status = "inactive";
          if (
            coupons[i].startDate.toISOString().split("T")[0] <= currDate &&
            coupons[i].endDate.toISOString().split("T")[0] > currDate
          ) {
            coupons[i].status = "active";
          } else if (
            coupons[i].endDate.toISOString().split("T")[0] < currDate
          ) {
            coupons[i].status = "expire";
          } else {
            coupons[i].status = "inactive";
          }
        }

        res.json({
          status: "success",
          code: "record_founded",
          message: "All Coupons record are here",
          coupons: coupons,
        });
      })
      .catch((err) => next(err));
  }
);

//----------------------------VERIFYING A COUPON FROM ITS CODE------------------------------------

export const verify = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    updateCouponStatus();

    const couponCode = req.params.code;

    const rows: any = await getTableData("coupon", [
      { key: "code", value: couponCode, condition: " = " },
    ]).catch((err) => {
      next(err);
    });

    console.log(rows);

    if (rows.length > 0 && rows[0].status == "active") {
      res.json({
        status: "success",
        code: "record_verified",
        message: "your coupon code has been verified",
        coupon: rows[0],
      });
    } else {
      res.json({
        status: "fail",
        code: "record_not_found",
        message: "your coupon code is invalid",
      });
    }
  }
);

export const updateCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Coupons
    updateCouponStatus();

    const couponId = req.params.id;

    console.log(req.body);

    const coupon: any = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      campaignName: req.body.campaignName,
      code: req.body.code,
      discount: req.body.discount,
    };

    console.log(coupon);

    updateTableData("coupon", coupon, [
      { key: "couponId", value: couponId, condition: " = " },
    ])
      .then(async (coupon) => {
        const updatedCoupon: any = await getTableData("coupon", [
          { key: "couponId", value: couponId, condition: " = " },
        ]);

        updateCouponStatus();
        res.json({
          status: "success",
          code: "record_updated",
          message: "Coupon Record Updated",
          coupon: updatedCoupon[0],
        });
      })
      .catch((err) => {
        next(err);
      });
  }
);

export const deleteCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    updateCouponStatus();
    // Coupons

    const couponId = req.params.id;

    deleteTableData("coupon", [
      { key: "couponId", value: couponId, condition: " = " },
    ])
      .then((data) => {
        res.json({
          status: "success",
          code: "record_deleted",
          message: "Coupon Record Deleted",
        });
      })
      .catch((err) => next(err));
  }
);

export const updateCouponStatus = async () => {
  const coupons: any = await getTableData("coupon");
  for (let i = 0; i < coupons.length; i++) {
    let status = coupons[i].status;

    const currDate = new Date().toISOString().split("T")[0];

    if (coupons[i].startDate.toISOString().split("T")[0] > currDate) {
      status = "inactive";
    }

    if (
      coupons[i].startDate.toISOString().split("T")[0] <= currDate &&
      coupons[i].endDate.toISOString().split("T")[0] >= currDate
    ) {
      status = "active";
    }
    if (
      coupons[i].startDate.toISOString().split("T")[0] < currDate &&
      coupons[i].endDate.toISOString().split("T")[0] < currDate
    ) {
      status = "expired";
    }

    await updateTableData("coupon", { status: status }, [
      { key: "couponId", value: coupons[i].couponId, condition: " = " },
    ]);
  }
};

export const promoteCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const couponId = req.params.id;

    const customers: any = await getTableData("customer", [
      { key: "promotionSubscription", value: true, condition: " = " },
    ]);

    const coupons: any = await getTableData("coupon", [
      { key: "couponId", value: couponId, condition: " = " },
    ]);

    customers.forEach((customer: any) => {
      const body: string = ` <div> <h1>Your coupon code : ${coupons[0].code}  </h1> </div>
                             <div> Percent Off: ${coupons[0].discount} </div>
                             <div> End Date: ${coupons[0].endDate}</div>`;
      sendEmail(customer.userEmail, `Promotion Email Personafumes`, body);
    });

    res.json({
      status: "success",
      code: "email_sent",
      message: "Coupon promotion to all coustomers sent",
    });
  }
);

export const unsubscribePromotionSubscription = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.query.email;

    updateTableData("customer", { promotionSubscription: false }, [
      { key: "userEmail", value: email, condition: " = " },
    ]);

    res.json({
      status: "success",
      code: "unsubscribed_success",
      message: "Promotion emails are unsubscribed on this account",
    });
  }
);
