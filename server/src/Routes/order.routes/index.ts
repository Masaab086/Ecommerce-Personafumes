import express from "express";
import {
  createOrder,
  getACustomerOrders,
  getAdminSales,
  getAllOrders,
  getOrdersDetails,
} from "../../controller/order.Controller";
import { requireAdmin, requireLogin } from "../../middlewares/auth";

const orderRouter = express.Router();

orderRouter.post("/order", requireLogin, createOrder);
orderRouter.put("/order", requireLogin, createOrder);
orderRouter.put("/order/status/:id", requireLogin, createOrder);
orderRouter.get("/orders", requireAdmin, getAllOrders);
orderRouter.get("/orders/customer", requireLogin, getACustomerOrders);
orderRouter.get("/orders/:id", requireAdmin, getOrdersDetails);
orderRouter.get("/admin/orders", requireAdmin, getAdminSales);

export default orderRouter;
