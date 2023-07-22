import express from "express";
import {
  createFragrance,
  createSpecialArray,
  deleteFragrance,
  getAllFragrance,
  getAllFragranceAdmin,
  publishFragrance,
  updateFragrance,
} from "../../controller/fragrance.controller";
import { requireAdmin } from "../../middlewares/auth";

const fragranceRouter = express.Router();

fragranceRouter.post("/fragrance", requireAdmin, createFragrance);
fragranceRouter.post("/fragrance/special", createSpecialArray);
fragranceRouter.put("/fragrance/:id", requireAdmin, updateFragrance);
fragranceRouter.delete("/fragrance/:id", requireAdmin, deleteFragrance);
fragranceRouter.get("/fragrance", getAllFragrance);
fragranceRouter.put("/fragrance/publish/:id", requireAdmin, publishFragrance);
fragranceRouter.delete(
  "/fragrance/publish/:id",
  requireAdmin,
  publishFragrance
);
fragranceRouter.get("/admin/fragrance", requireAdmin, getAllFragranceAdmin);

export default fragranceRouter;
