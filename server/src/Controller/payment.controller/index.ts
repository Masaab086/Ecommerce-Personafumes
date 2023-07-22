import { NextFunction, Request, Response } from "express";
import connection, { executeQuery, getTableData } from "../../db/db";
import { catchAsync } from "../../utils/catch.async";

export const verifyPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.data.object.customer_details);
  }
);

export const getSales = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let sale = 0;
    let pendingOrders = 0;
    let completedOrders = 0;
    let returnedOrders = 0;
    let currentMonthSales = 0;
    let currentDaySales = 0;
    let totalOrders = 0;

    // All orders
    let data: any = await executeQuery(
      "Select count(orderId) as total from orders"
    );

    totalOrders = data[0].total;

    // Completed orders
    data = await executeQuery(
      `Select count(orderId) as total from orders where orderStatus = 'delivered'`
    );
    completedOrders = data[0].total;

    data = await executeQuery(
      `Select count(orderId) as total from orders where orderStatus != 'delivered'`
    );
    pendingOrders = data[0].total;
    data = await executeQuery(
      `Select count(orderId) as total from orders where orderStatus = 'cancelled'`
    );
    returnedOrders = data[0].total;
    data = await executeQuery(
      `select COALESCE( sum(orderTotal) , 0) as total from orders where  MONTH(dateTime) = MONTH(CURRENT_DATE())
          AND YEAR(dateTime) = YEAR(CURRENT_DATE());`
    );
    currentMonthSales = data[0].total;
    data = await executeQuery(
      `select COALESCE( sum(orderTotal) , 0) as total from orders where  Date(dateTime) = Date(CURRENT_DATE());`
    );
    currentDaySales = data[0].total;
    data = await executeQuery(
      `select COALESCE( sum(orderTotal) , 0) as total from orders where  Date(dateTime) = Date(CURRENT_DATE());`
    );
    currentDaySales = data[0].total;
    data = await executeQuery(
      `SELECT COALESCE( SUM(orderTotal),0) as total from orders`
    );
    sale = data[0].total;

    res.json({
      status: "success",
      code: "record_founded",
      message: "All The sales total",
      reports: {
        sale,
        currentDaySales,
        currentMonthSales,
        completedOrders,
        returnedOrders,
        pendingOrders,
        totalOrders,
      },
    });
  }
);
