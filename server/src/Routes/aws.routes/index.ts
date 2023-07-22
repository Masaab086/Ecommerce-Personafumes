import express from "express";
import { body } from "express-validator";
import {
  deleteFileByUrl,
  getUpdateUrl,
  getUploadUrl,
} from "../../controller/aws.controller";

const awsRouter = express.Router();

awsRouter.get("/file/:folder", getUploadUrl);
awsRouter.put(
  "/file",
  [body("url", "Please provide a file url").isURL()],
  getUpdateUrl
);
awsRouter.delete(
  "/file",
  [body("url", "Please provide a file url").isURL()],
  deleteFileByUrl
);

export default awsRouter;
