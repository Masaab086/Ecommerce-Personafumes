import express from "express";
import {
  createPersonalize,
  updatePersonalize,
} from "../../controller/personalize.controlelr";

const personalizeRouter = express.Router();

personalizeRouter.post("/personalize", createPersonalize);
personalizeRouter.put("/personalize/:id", updatePersonalize);

export default personalizeRouter;
