import { NextFunction, Request, Response } from "express";
import {
  executeQuery,
  getTableData,
  insertTableData,
  updateTableData,
} from "../../db/db";
import { order } from "../../models/orders.modal";

import dotenv from "dotenv";
import {
  personalize,
  personalizeDataList,
} from "../../models/personalize.modal";
import { catchAsync } from "../../utils/catch.async";
import { Stripe } from "stripe";
import { payment } from "../../models/payment.modal";
import { CodeArtifact } from "aws-sdk";

dotenv.config({ path: "../../../.env" });

// Stripe confeguration

const stripe = new Stripe(
  "sk_test_51LTJ9sK4bR13Sd8QloCboHcBeZPnqE2EnviyWUQHBfFWPfsaSi2jGKjHdLVy7vpFHOMTYcmtibVK0eS6m5W3mBK400sjl8jkZf",
  {
    apiVersion: "2022-08-01",
  }
);
export const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Creating a unique order id
    const orderId: string = new Date().valueOf().toString();
    // Getting customer Id
    const customerId: string = req.body.decode.customerId;

    const { products } = req.body;

    console.log(products);

    let personalizeData: personalizeDataList = [];

    // Creating products data

    let orderSubtotal = 0;
    let saleTax = 0;

    if (products)
      for (let i = 0; i < products.length; i++) {
        // Creating a unique product Id
        products[i].orderProductId = new Date().valueOf() + `${i}`;
        products[i].orderId = orderId;

        // Fetching the bottle data
        const bottle: any = await getTableData("bottle", [
          { key: "bottleId", condition: " = ", value: products[i].bottleId },
        ]);

        // Fetching the fragrance data
        const fragrance: any = await getTableData("fragrance", [
          {
            key: "fragranceId",
            condition: " = ",
            value: products[i].fragranceId,
          },
        ]);

        if (!products[i].weight) {
          products[i].weight = bottle[0].capacity;
        }
        products[
          i
        ].fragranceDescription = `${fragrance[0].fragranceName} - ${products[i].weight}ML`;
        products[i].bottleCost = Number(bottle[0].price);
        if (Number(products[i].weight) > 0) {
          products[i].fragranceCost =
            Number(fragrance[0].unitCost) * Number(products[i].weight);
        } else {
          products[i].fragranceCost =
            Number(fragrance[0].unitCost) * Number(bottle[0].capacity);
        }
        products[i].personalizationCost = 0;

        // delete products[i].weight;

        // Calculating the personalize data
        if (products[i].personalize) {
          let personalizeTotalCost: any = 0;

          // Calculating the personalize cost for a single object
          for (let j = 0; j < products[i].personalize.length; j++) {
            let cost = 0;

            const personalizationData: any = await getTableData("personalize", [
              {
                key: "personalizeId",
                value: products[i].personalize[j],
                condition: " = ",
              },
            ]);

            const personalizationPrice: any = await getTableData(
              "personalizationPrice",
              [
                {
                  key: "bottleId",
                  value: products[i].bottleId,
                  condition: " = ",
                },
              ]
            );

            if (
              personalizationData.length > 0 &&
              personalizationPrice.length > 0
            ) {
              if (
                personalizationData[0].text != undefined &&
                personalizationData[0].text.length > 0
              ) {
                cost += Number(personalizationPrice[0].textPrice);
              }

              if (
                personalizationData[0].image != undefined &&
                personalizationData[0].image.length > 0
              ) {
                cost += Number(personalizationPrice[0].mediaPrice);
              }
              if (
                personalizationData[0].artImage != undefined &&
                personalizationData[0].artImage.length > 0
              ) {
                cost += Number(personalizationPrice[0].artPrice);
              }
              personalizeTotalCost += cost;
              const personalizeDataId = new Date().valueOf() + `${i}` + `${j}`;
              personalizeData.push({
                personalizeDataId,
                personalizeId: products[i].personalize[j],
                orderProductId: products[i].orderProductId,
                personalizeCost: cost,
              });
            }
          }
          products[i].personalizationCost = personalizeTotalCost;

          delete products[i].personalize;
        }

        orderSubtotal +=
          products[i].bottleCost +
          products[i].fragranceCost +
          products[i].personalizationCost;
      }

    let shippingCost = 0;

    // Now stripe

    let discount = 0;
    let discounts = [];
    if (req.body.code.length > 0) {
      const rows: any = await getTableData("coupon", [
        { key: "code", value: req.body.code, condition: " = " },
      ]);

      if (rows.length > 0) {
        discount = Number(rows[0].discount);
        // First creating a coupon
        const coupon = await stripe.coupons.create({
          percent_off: discount,
          duration: "once",
        });
        discounts.push({ coupon: coupon.id });
      }
    }

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: products.map((product: any, i: any) => {
          const fragDesc = product.fragranceDescription;
          delete products[i].fragranceDescription;

          return {
            price_data: {
              currency: "usd",
              product_data: { name: fragDesc },
              unit_amount:
                (product.fragranceCost +
                  product.bottleCost +
                  product.personalizationCost) *
                100,
            },
            quantity: product.quantity,
          };
        }),

        discounts: discounts,

        success_url: `${process.env.CLIENT_URL}/success?id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });

    const payment: payment = {
      paymentId: new Date().valueOf().toString(),
      customerId,
      orderId,
      paidAmount: orderSubtotal + saleTax + shippingCost,
      paymentStatus: "unverified",
      sessionId: checkoutSession.id,
    };

    // Now inserting the data to the database
    const newOrder: order = {
      orderId,
      customerId,
      saleTax,
      orderSubtotal,
      orderTotal: orderSubtotal + saleTax + shippingCost,
      shippingCost,
      orderStatus: "Processing",
    };

    await insertTableData("orders", newOrder);
    let j = 0;
    for (let i = 0; i < products.length; i++) {
      await insertTableData("orderProduct", products[i]);

      if (j < personalizeData.length) {
        await insertTableData("personalizeData", personalizeData[j]);

        j++;
      }
    }

    await insertTableData("payment", payment);

    res.json({
      status: "success",
      code: "record_created",
      message:
        "Your order has been submitted. Complete the payment to confirm your order",
      url: checkoutSession.url,
    });
  }
);
export const update = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id;
  }
);

// Get all orders to send the orders to the admin

export const getAllOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    getTableData("orders")
      .then((orders) =>
        res.json({
          status: "success",
          code: "record_founded",
          message: "All the orders",
          orders,
        })
      )
      .catch((err) => next(err));
  }
);

// Get all orders belongs to a customer

export const getACustomerOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.body.decode.customerId;

    console.log(customerId);

    getTableData("orders", [
      { key: "customerId", value: customerId, condition: " = " },
    ])
      .then((orders) =>
        res.json({
          status: "success",
          code: "record_founded",
          message: "All the Customer orders",
          orders,
        })
      )
      .catch((err) => next(err));
  }
);
export const getOrdersDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id;
    console.log("Select the order Products");
    getTableData("orderProduct", [
      { key: "orderId", value: orderId, condition: " = " },
    ])
      .then(async (bottle: any) => {
        for (let i = 0; i < bottle.length; i++) {
          // Selecting the fragrance

          let frg: any = await getTableData("fragrance", [
            {
              key: "fragranceId",
              value: bottle[i].fragranceId,
              condition: " = ",
            },
          ]);
          bottle[i].fragrance = frg[0];
          bottle[i].totalCost =
            Number(bottle[i].bottleCost) +
            Number(bottle[i].fragranceCost) +
            Number(bottle[i].personalizationCost);
          delete bottle[i].fragranceId;

          let bott: any = await getTableData("bottle", [
            {
              key: "bottleId",
              value: bottle[i].bottleId,
              condition: " = ",
            },
          ]);
          bottle[i].bottle = bott[0];
          delete bottle[i].bottleId;
        }

        res.json({
          status: "success",
          code: "record_founded",
          message: "All the order details",
          bottle,
        });
      })
      .catch((err) => next(err));
  }
);

export const orderStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bottleId = req.params.id;

    updateTableData("orders", { orderStatus: req.body.status }, [
      { key: "bottleId", value: bottleId, condition: " = " },
    ]).then((bottle) => {
      res.json({
        status: "success",
        code: "record_updated",
        message: "Order status has been updated has been published",
        bottle,
      });
    });
  }
);

export const getAdminSales = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    executeQuery(`select *  from customer
join orders
on customer.customerId = orders.customerId;`).then((orders) => {
      res.json({
        status: "success",
        code: "record_founded",
        message: "slae orders record founded",
        orders,
      });
    });
  }
);
