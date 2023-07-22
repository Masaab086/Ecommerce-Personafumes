import express from "express";

const recaptaRouter = express.Router();

// Verify Recapta
recaptaRouter.post("/recapat/verify");

export default recaptaRouter;
