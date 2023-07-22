import express from "express";
import { createOrder } from "../../controller/order.Controller";
import { getSales, verifyPayment } from "../../controller/payment.controller";
import { requireAdmin, requireLogin } from "../../middlewares/auth";

const paymentRouter = express.Router();

paymentRouter.post("/payment/verify", verifyPayment);
paymentRouter.get("/admin/sales", requireAdmin, getSales);

export default paymentRouter;
