import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
const App = express();

dotenv.config();

App.use(express.json());

App.use(cors());

// cors({ origin: process.env.ALLOWED_ORIGINS!.split(","), credentials: true })

App.use(morgan("tiny"));
App.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// Importing our reoutes
import authRoutes from "./routes/auth.routes/index";
import awsRouter from "./routes/aws.routes";
import couponRouter from "./routes/coupon.routes";
import { errorHandler } from "./middlewares/error.handler";
import AppError from "./utils/AppError";
import bottleRouter from "./routes/bottle.routes";
import fragranceRouter from "./routes/fragrance.routes";
import personalizeRouter from "./routes/personalize.routes";
import paymentRouter from "./routes/payment.routes";
import bottleMediaRouter from "./routes/bottle.media.routes";
import orderRouter from "./routes/order.routes";

// Using our routes
App.use("/api", authRoutes);
App.use("/api", awsRouter);
App.use("/api", couponRouter);
App.use("/api", bottleRouter);
App.use("/api", fragranceRouter);
App.use("/api", personalizeRouter);
App.use("/api", paymentRouter);
App.use("/api", orderRouter);
App.use("/api", bottleMediaRouter);
App.use("/", (req: Request, res: Response) => {
  res.json({ name: "Personafumes Ecommrace", version: "v1.0,0" });
});

App.use(errorHandler);

// A default route
App.use((req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(
      "url_not_found",
      `The URL ${req.originalUrl} does not exist`,
      404
    )
  );
});
export default App;
