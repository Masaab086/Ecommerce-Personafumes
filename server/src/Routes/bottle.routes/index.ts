import express from "express";
import {
  createBottle,
  deleteBottle,
  getABottle,
  getAllBottles,
  getAllBottlesAdmin,
  getLatestBottles,
  publish,
  updateBottle,
} from "../../controller/bottle.controller";
import { requireAdmin } from "../../middlewares/auth";

const bottleRouter = express.Router();

bottleRouter.post("/bottle", requireAdmin, createBottle);
bottleRouter.put("/bottle/:id", requireAdmin, updateBottle);
bottleRouter.get("/bottle", getAllBottles);
bottleRouter.get("/admin/bottle", requireAdmin, getAllBottlesAdmin);
bottleRouter.put("/bottle/publish/:id", requireAdmin, publish);
bottleRouter.get("/bottle/latest", getLatestBottles);
bottleRouter.delete("/bottle/:id", requireAdmin, deleteBottle);
bottleRouter.get("/admin/bottle/:id", requireAdmin, getABottle);

export default bottleRouter;
