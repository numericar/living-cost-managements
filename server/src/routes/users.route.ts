import express, { Router } from "express";
import * as usersController from "../controllers/users.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router: Router = express.Router();

/**
 * @swagger
 * /api/v1/auths/health-check:
 *   get:
 *     summary: health check api
 *     responses:
 *       200:
 *         description: successful
 */
router.get("/health-check", authMiddleware, usersController.healthCheck);

export default router;