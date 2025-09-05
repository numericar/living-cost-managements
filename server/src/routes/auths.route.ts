import express, { Router } from "express";
import * as authController from "../controllers/auths.controller";

const router: Router = express.Router();

router.get("/health-check", authController.healthCheck);

export default router;