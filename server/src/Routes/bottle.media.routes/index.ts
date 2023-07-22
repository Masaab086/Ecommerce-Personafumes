import express from "express";
import {
  createBottleMedia,
  deleteBottleMedia,
  getAllBottleMedia,
  updateBottleMedia,
} from "../../controller/bottleMediaController";
import { requireAdmin } from "../../middlewares/auth";

const bottleMediaRouter = express.Router();

bottleMediaRouter.post("/bottle/media", requireAdmin, createBottleMedia);
bottleMediaRouter.put("/bottle/media/:id", requireAdmin, updateBottleMedia);
bottleMediaRouter.delete("/bottle/media/:id", requireAdmin, deleteBottleMedia);
bottleMediaRouter.get("/bottle/media", getAllBottleMedia);

export default bottleMediaRouter;
